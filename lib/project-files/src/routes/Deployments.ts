import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';

import { k8sAppsApi } from '../shared/KubernetesClient';
import Deployment from '@entities/Deployment';

// Init shared
const router = Router();


/******************************************************************************
 *                      Get All Deployments - "GET /api/deployments/"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
    if (k8sAppsApi === null) {
        console.log('K8s client hasn\'t been initialized properly. Is the cluster running?');
        return res.status(OK).json({deployments: []});
    }
    const k8sDeployments = await k8sAppsApi.listDeploymentForAllNamespaces();
    const deployments = k8sDeployments.body.items.map(Deployment.parseDeployment);
    console.log(deployments);
    return res.status(OK).json({deployments});
});


/******************************************************************************
 *                       Add One - "POST /api/deployments/"
 ******************************************************************************/

router.post('/', async (req: Request, res: Response) => {
    const { deployment } = req.body;
    if (!deployment) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    // await k8sAppsApi.createNamespacedDeployment(..);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/deployments/"
 ******************************************************************************/

router.put('/', async (req: Request, res: Response) => {
    const { deployment } = req.body;
    if (!deployment) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    // await k8sAppsApi.patchNamespacedDeployment(..);
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/deployments/:name"
 ******************************************************************************/

router.delete('/:name', async (req: Request, res: Response) => {
    if (k8sAppsApi === null) {
        console.log('K8s client hasn\'t been initialized properly. Is the cluster running?');
        return res.status(OK).end();
    }
    const { name } = req.params as ParamsDictionary;
    await k8sAppsApi.deleteNamespacedDeployment(name, 'default');
    return res.status(OK).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
