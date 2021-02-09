//ignore tls errors
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const k8s = require('@kubernetes/client-node');

// load kubeconfig
const kc = new k8s.KubeConfig();
const kubeConfigFile = 'admin-kubeconfig.yml';
kc.loadFromFile(kubeConfigFile);
const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

targetDeploymentName = 'dev-v3-medic-sentinel';
targetNamespace = 'cht';
containerName = 'medic-sentinel'
targetVersion = '3.7.0-test10'


async function updateDeployment(deploymentName, namespace, containerName, version) {
    // find the particular deployment
    const res = await k8sApi.readNamespacedDeployment(deploymentName, namespace, exact = true);
    let deployment = res.body;
    let newDeployment = updateImageVersionInDeployment(deployment, containerName, version)
    // replace
    await k8sApi.replaceNamespacedDeployment(deploymentName, namespace, newDeployment);
}

function updateImageVersionInDeployment(deployment, containerName, newVersion) {

    let containerIndex = deployment.spec.template.spec.containers
        .findIndex(x => x.name == containerName);
    let container = deployment.spec.template.spec.containers[containerIndex];
    container.image = container.image.replace(/\:.*/, ':' + newVersion);
    //update deployment
    deployment.spec.template.spec.containers[containerIndex] = container;
    return deployment;

}


updateDeployment(targetDeploymentName, targetNamespace, containerName, targetVersion);