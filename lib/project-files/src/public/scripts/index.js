/******************************************************************************
 *                          Fetch and display deployments
 ******************************************************************************/

displayDeployments();


function displayDeployments() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
    httpGet('/api/deployments/all')
        .then(response => response.json())
        .then((response) => {
            var allDeployments = response.deployments;
            // Empty the anchor
            var allDeploymentsAnchor = document.getElementById('all-deployments-anchor');
            allDeploymentsAnchor.innerHTML = '';
            // Append deployments to anchor
            allDeployments.forEach((d) => {
                allDeploymentsAnchor.innerHTML += getDeploymentDisplayEle(d);
            });
            spinner.style.display = 'none';
        });
};


function getDeploymentDisplayEle(deployment) {
    return `<div class="deployment-display-ele">

        <div class="normal-view">
            <div>Name: ${deployment.name}</div>
            <div>Image: ${deployment.image}</div>
            <div>Replicas: ${deployment.replicas}</div>
            
            <button class="delete-deployment-btn" data-deployment-name="${deployment.name}">
                Delete
            </button>
        </div>
        
    </div>`;
}


/******************************************************************************
 *                        Delete deployments
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('.delete-deployment-btn')) {
        deleteDeployment(ele);
    }
}, false)


function deleteDeployment(ele) {
    var name = ele.getAttribute('data-deployment-name');
	httpDelete('/api/deployments/delete/' + name)
        .then(() => {
            displayDeployments();
        })
}


function httpGet(path) {
    return fetch(path, getOptions('GET'))
}

function httpDelete(path) {
    return fetch(path, getOptions('DELETE'));
}


function getOptions(verb, data) {
    var options = {
        dataType: 'json',
        method: verb,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return options;
}

