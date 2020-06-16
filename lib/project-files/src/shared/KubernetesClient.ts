import { KubeConfig, CoreV1Api, AppsV1Api, StorageV1Api, LogsApi } from '@kubernetes/client-node';

class KubernetesClient {
    private static instance: KubernetesClient;
    private k8sCoreApi: CoreV1Api;
    private k8sAppsApi: AppsV1Api;
    private k8sStorageApi: StorageV1Api;
    private k8sLogsApi: LogsApi;
    // .. feel free to expose more: https://git.io/Jf58K

    private k8sKubeConfig: KubeConfig;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {
        this.k8sKubeConfig = new KubeConfig();
        this.k8sKubeConfig.loadFromDefault();
        this.k8sCoreApi = this.k8sKubeConfig.makeApiClient(CoreV1Api);
        this.k8sAppsApi = this.k8sKubeConfig.makeApiClient(AppsV1Api);
        this.k8sStorageApi = this.k8sKubeConfig.makeApiClient(StorageV1Api);
        this.k8sLogsApi = this.k8sKubeConfig.makeApiClient(LogsApi);
    }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): KubernetesClient {
        if (!KubernetesClient.instance) {
            KubernetesClient.instance = new KubernetesClient();
        }

        return KubernetesClient.instance;
    }

    public static k8sCoreApi(): CoreV1Api {
        return KubernetesClient.getInstance().k8sCoreApi;
    }

    public static k8sAppsApi(): AppsV1Api {
        return KubernetesClient.getInstance().k8sAppsApi;
    }

    public static k8sStorageApi(): StorageV1Api {
        return KubernetesClient.getInstance().k8sStorageApi;
    }

    public static k8sLogsApi(): LogsApi {
        return KubernetesClient.getInstance().k8sLogsApi;
    }

    public static k8sKubeConfig(): KubeConfig {
        return KubernetesClient.getInstance().k8sKubeConfig;
    }
}
const k8sCoreApi: CoreV1Api = KubernetesClient.k8sCoreApi();
const k8sAppsApi: AppsV1Api = KubernetesClient.k8sAppsApi();
const k8sStorageApi: StorageV1Api = KubernetesClient.k8sStorageApi();
const k8sLogsApi: LogsApi = KubernetesClient.k8sLogsApi();
const k8sKubeConfig: KubeConfig = KubernetesClient.k8sKubeConfig();

export { k8sCoreApi, k8sAppsApi, k8sStorageApi, k8sLogsApi, k8sKubeConfig };