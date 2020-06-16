import { V1Deployment } from '@kubernetes/client-node';

export interface IDeployment {
    name: string;
    image: string;
    replicas: number;
}

class Deployment implements IDeployment {

    public name: string;
    public image: string;
    public replicas: number;

    constructor(nameOrDeployment: string | IDeployment, image?: string, replicas?: number) {
        if (typeof nameOrDeployment === 'string') {
            this.name = nameOrDeployment;
            this.image = image || 'nginx';
            this.replicas = replicas || 1;
        } else {
            this.name = nameOrDeployment.name;
            this.image = nameOrDeployment.image;
            this.replicas = nameOrDeployment.replicas;
        }
    }

    public static parseDeployment(json: V1Deployment): IDeployment {
        const name = json!.metadata!.name!;
        const image = json!.spec!.template!.spec!.containers[0]!.image!;
        const replicas = json!.spec!.replicas!;
        
        return new Deployment(name, image, replicas);
    }
}

export default Deployment;
