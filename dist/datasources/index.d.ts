import Config from "../config";
import { IResults, IImage } from "./adapter";
export default class DataSources {
    list: string[];
    config: Config;
    constructor(config: Config, list?: [string]);
    getConfig: () => Config;
    getDefaultList: () => string[];
    getDataSources(): Promise<object>;
    search(q: string, offset?: number, count?: number): Promise<object>;
    images(offset?: number, count?: number): Promise<object>;
    mergeResults(resultsA: IResults, resultsB: IResults): IResults;
    sortResults: (a: IImage, b: IImage) => 1 | -1;
}
