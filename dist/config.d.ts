interface IIndexSignature {
    [propName: string]: any;
}
/** DataSource interface */
export interface IDataSource {
    [propName: string]: object | string | number;
}
/** Interface for config structure */
export interface IConfig extends IIndexSignature {
    apiPrefix: string;
    dataSources: IDataSource;
    port: number;
    queryParam: string;
    dataSourcesParam: string;
}
export declare const defaultConfig: IConfig;
/**
 * Class to control app configuration
 */
declare class Config {
    /** Config file path */
    private configFile;
    private config;
    /** Contains config with removed ${removeKeys} */
    private configSafe;
    constructor(configFile?: string);
    /**
     * This is ugly and should be refactor
     * Idea is too remove unwanted config keys
     */
    removeKeys: (config: IConfig) => IConfig;
    /**
     * Get the whole app config
     */
    get: (param?: string, safe?: boolean) => any;
}
export default Config;
