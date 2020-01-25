"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_1 = __importDefault(require("./adapter"));
class Pixabay extends adapter_1.default {
    constructor() {
        super(...arguments);
        /**
         * Need to set offset on fetch.
         * Because API doesn't provide.
         */
        this.offset = 0;
        /**
         * Translates Pixabay to our format
         */
        this.translateImages = (responseData) => {
            const images = responseData.hits.map((pixabayImage) => this.translateImage(pixabayImage));
            return images;
        };
        this.getTotal = (data) => data.total;
        this.getCount = (data) => data.hits.length;
        this.getOffset = (data) => this.offset;
        this.setOffset = (offset) => this.offset = offset;
    }
    /**
     * Parse date from url
     * Yeah that is sick but that's the only way :P
     */
    parseDate(image) {
        const m = image.previewURL.match(/([\d]{4})\/([\d]{2})\/([\d]{2})\/([\d]{2})\/([\d]{2})\//);
        return `${m[1]}-${m[2]}-${m[3]} ${m[4]}:${m[5]}`;
    }
    /**
     * Multiple sizes for responsive
     * Probably not necessary for out purpose but what the heck
     */
    translateImage(pixabayImage) {
        const type = pixabayImage.webformatURL.split('.').pop();
        const image = {
            type,
            created: this.parseDate(pixabayImage),
            datasource: 'pixabay',
            images: [{
                    width: pixabayImage.webformatWidth,
                    height: pixabayImage.webformatHeight,
                    url: pixabayImage.webformatURL,
                    size: '640px'
                },
                {
                    width: Math.floor((1280 / pixabayImage.imageHeight) * pixabayImage.imageWidth),
                    height: 1280,
                    url: pixabayImage.largeImageURL,
                    size: '1280px'
                }],
            pageUrl: pixabayImage.pageURL,
        };
        return image;
    }
    search(query, offset, count) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = this.getEndpoint("search");
            this.setOffset(offset);
            return this.getData("search", {
                [endpoint.queryParam]: query,
                per_page: count,
                page: Math.floor(offset / count) + 1
            });
        });
    }
    images(offset, count) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = this.getEndpoint("images");
            this.setOffset(offset);
            return this.getData("images", {
                per_page: count,
                page: Math.floor(offset / count) + 1
            });
        });
    }
}
exports.default = Pixabay;
//# sourceMappingURL=pixabay.js.map