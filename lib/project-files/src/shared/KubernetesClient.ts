import { KubeConfig, CoreV1Api, AppsV1Api, StorageV1Api, LogsApi } from '@kubernetes/client-node';

class KubernetesClient {
    private static instance: KubernetesClient;
    private k8sCoreApi: CoreV1Api | null;
    private k8sAppsApi: AppsV1Api | null;
    private k8sStorageApi: StorageV1Api | null;
    private k8sLogsApi: LogsApi | null;
    // .. feel free to expose more: https://git.io/Jf58K

    private k8sKubeConfig: KubeConfig | null;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {
        try {
            this.k8sKubeConfig = new KubeConfig();
            this.k8sKubeConfig.loadFromDefault();
            this.k8sCoreApi = this.k8sKubeConfig.makeApiClient(CoreV1Api);
            this.k8sAppsApi = this.k8sKubeConfig.makeApiClient(AppsV1Api);
            this.k8sStorageApi = this.k8sKubeConfig.makeApiClient(StorageV1Api);
            this.k8sLogsApi = this.k8sKubeConfig.makeApiClient(LogsApi);
        } catch (err) {
            console.log(err);
            [this.k8sCoreApi, this.k8sAppsApi, this.k8sStorageApi, this.k8sLogsApi, this.k8sKubeConfig] = [null, null, null, null, null];
        }
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

    public static k8sCoreApi(): CoreV1Api | null {
        return KubernetesClient.getInstance().k8sCoreApi;
    }

    public static k8sAppsApi(): AppsV1Api | null {
        return KubernetesClient.getInstance().k8sAppsApi;
    }

    public static k8sStorageApi(): StorageV1Api | null {
        return KubernetesClient.getInstance().k8sStorageApi;
    }

    public static k8sLogsApi(): LogsApi | null {
        return KubernetesClient.getInstance().k8sLogsApi;
    }

    public static k8sKubeConfig(): KubeConfig | null {
        return KubernetesClient.getInstance().k8sKubeConfig;
    }
}
const k8sCoreApi: CoreV1Api | null = KubernetesClient.k8sCoreApi();
const k8sAppsApi: AppsV1Api | null = KubernetesClient.k8sAppsApi();
const k8sStorageApi: StorageV1Api | null = KubernetesClient.k8sStorageApi();
const k8sLogsApi: LogsApi | null = KubernetesClient.k8sLogsApi();
const k8sKubeConfig: KubeConfig | null = KubernetesClient.k8sKubeConfig();

export { k8sCoreApi, k8sAppsApi, k8sStorageApi, k8sLogsApi, k8sKubeConfig };