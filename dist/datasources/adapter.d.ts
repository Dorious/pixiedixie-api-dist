import Config from "../config";
import { AxiosResponse } from "axios";
export declare const DEFAULT_COUNT = 25;
export interface IImageSize {
    width: number;
    height: number;
    url: string;
    size: string;
}
export interface IImage {
    created: string;
    datasource?: string;
    images: IImageSize[];
    pageUrl: string;
    type: string;
}
export interface IResults {
    totalCount: number;
    offset: number;
    count: number;
    images: IImage[];
    error?: ErrorConstructor;
}
export interface IDataSourceConfig {
    [propName: string]: any;
}
export interface IDataSourceParams {
    query?: string;
    offset?: number;
    count?: number;
    [propName: string]: any;
}
/**
 * Abstract class for any Data Source
 * Check README.md for documentation
 */
export default abstract class DatasourceAdapter {
    private config;
    private configKey;
    constructor(config: Config);
    /**
     * Probably obvious: search
     * @param query Query string
     * @param offset Where to start
     * @param count How much
     */
    abstract search(query: string, offset: number, count: number): Promise<IResults | string>;
    /**
     * Method for main page to get lates/random/trendy pictues
     * @param offset Where to start
     * @param count How much
     */
    abstract images(offset: number, count: number): Promise<IResults | string>;
    /**
     * Returns this DataSource config from config.json
     */
    getConfig(): IDataSourceConfig;
    /**
     * Return configuration for specific endpoint
     * @param name A name of endpoint from config.json
     */
    getEndpoint(name: string): {
        url: string;
        queryParam: any;
        params: {
            [x: number]: any;
        };
    };
    /**
     * Methods for for pagination
     */
    getTotal: (data: AxiosResponse<any>) => number;
    getCount: (data: AxiosResponse<any>) => number;
    getOffset: (data: AxiosResponse<any>) => number;
    /**
     * Fetch data via endpoint
     * @param endpointName A name of endpoint from config.json
     * @param params GET query params
     */
    getData(endpointName: string, params?: IDataSourceParams): Promise<IResults>;
    /**
     * Dummy translateImage function that just return the input
     */
    translateImages: (data: any) => any;
}
