import DatasourceAdapter, { IImage, IImageSize, IResults } from "./adapter";
import { AxiosResponse } from "axios";
export interface IGiphyImage {
    type: string;
    import_datetime: string;
    images: IGiphyImageSizes;
    url: string;
}
export interface IGiphyImageSizes {
    [propName: string]: IGiphyImageSize;
}
export interface IGiphyImageSize {
    url: string;
    width: number;
    height: number;
}
export interface ISizes {
    [propName: string]: string;
}
export interface IData extends AxiosResponse {
    data: [];
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    };
}
export default class Giphy extends DatasourceAdapter {
    sizes: ISizes;
    translateImageSizes: (giphyImage: IGiphyImage) => IImageSize[];
    translateImage: (giphyImage: IGiphyImage) => IImage;
    translateImages: (responseData: IData) => IImage[];
    getTotal: (data: IData) => number;
    getCount: (data: IData) => number;
    getOffset: (data: IData) => number;
    search(query: string, offset: number, count: number): Promise<IResults | string>;
    images(offset: number, count: number): Promise<IResults>;
}
