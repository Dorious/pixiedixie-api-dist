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
class Giphy extends adapter_1.default {
    constructor() {
        super(...arguments);
        this.sizes = {
            fixed_width: "normal"
        };
        this.translateImageSizes = (giphyImage) => {
            const imageSizes = Object.keys(this.sizes).map((key) => {
                const imageInfo = giphyImage.images[key];
                return {
                    size: this.sizes[key],
                    url: imageInfo.url,
                    width: imageInfo.width,
                    height: imageInfo.height
                };
            });
            return imageSizes;
        };
        this.translateImage = (giphyImage) => {
            const imageSizes = this.translateImageSizes(giphyImage);
            const image = {
                datasource: 'giphy',
                type: giphyImage.type,
                created: giphyImage.import_datetime,
                images: imageSizes,
                pageUrl: giphyImage.url
            };
            return image;
        };
        this.translateImages = (responseData) => {
            const images = responseData.data.map((giphyImage) => this.translateImage(giphyImage));
            return images;
        };
        this.getTotal = (data) => {
            return data.pagination.total_count;
        };
        this.getCount = (data) => {
            return data.pagination.count;
        };
        this.getOffset = (data) => {
            return data.pagination.offset;
        };
    }
    search(query, offset, count) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = this.getEndpoint("search");
            return this.getData("search", {
                [endpoint.queryParam]: query,
                limit: count,
                offset
            });
        });
    }
    images(offset, count) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = this.getEndpoint("images");
            return this.getData("images", {
                limit: count,
                offset
            });
        });
    }
}
exports.default = Giphy;
//# sourceMappingURL=giphy.js.map