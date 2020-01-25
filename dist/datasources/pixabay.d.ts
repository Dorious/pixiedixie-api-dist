import DatasourceAdapter, { IImage, IResults } from "./adapter";
import { AxiosResponse } from "axios";
export interface IPixabayImage {
    largeImageURL: string;
    imageHeight: number;
    imageWidth: number;
    pageURL: string;
    previewURL: string;
    type: string;
    webformatHeight: number;
    webformatWidth: number;
    webformatURL: string;
}
export interface IData extends AxiosResponse {
    hits: IPixabayImage[];
    total: number;
}
export default class Pixabay extends DatasourceAdapter {
    /**
     * Need to set offset on fetch.
     * Because API doesn't provide.
     */
    private offset;
    /**
     * Parse date from url
     * Yeah that is sick but that's the only way :P
     */
    parseDate(image: IPixabayImage): string;
    /**
     * Multiple sizes for responsive
     * Probably not necessary for out purpose but what the heck
     */
    translateImage(pixabayImage: IPixabayImage): IImage;
    /**
     * Translates Pixabay to our format
     */
    translateImages: (responseData: IData) => IImage[];
    getTotal: (data: IData) => number;
    getCount: (data: IData) => number;
    getOffset: (data: IData) => number;
    setOffset: (offset: number) => number;
    search(query: string, offset: number, count: number): Promise<IResults | string>;
    images(offset: number, count: number): Promise<IResults>;
}
