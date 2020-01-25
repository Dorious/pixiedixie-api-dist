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
const axios_1 = __importDefault(require("axios"));
exports.DEFAULT_COUNT = 25;
/**
 * Abstract class for any Data Source
 * Check README.md for documentation
 */
class DatasourceAdapter {
    constructor(config) {
        /**
         * Methods for for pagination
         */
        this.getTotal = (data) => 0;
        this.getCount = (data) => 0;
        this.getOffset = (data) => 0;
        /**
         * Dummy translateImage function that just return the input
         */
        this.translateImages = (data) => {
            const images = [];
            return images;
        };
        this.config = config;
        this.configKey = this.constructor.name.toLowerCase();
    }
    /**
     * Returns this DataSource config from config.json
     */
    getConfig() {
        const config = this.config.get("dataSources", false);
        return config[this.configKey];
    }
    /**
     * Return configuration for specific endpoint
     * @param name A name of endpoint from config.json
     */
    getEndpoint(name) {
        const config = this.getConfig();
        const { baseUrl, apiKeyParam, apiKey, queryParam, endpoints } = config;
        const endpoint = endpoints[name];
        return {
            url: `${baseUrl}${endpoint}`,
            queryParam,
            params: {
                [apiKeyParam]: apiKey
            }
        };
    }
    /**
     * Fetch data via endpoint
     * @param endpointName A name of endpoint from config.json
     * @param params GET query params
     */
    getData(endpointName, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = this.getEndpoint(endpointName);
            let results = {
                totalCount: 0,
                count: 0,
                offset: 0,
                images: []
            };
            let images = [];
            params = Object.assign(Object.assign({}, endpoint.params), params);
            try {
                // This odd way of invoking axios make it 
                const response = yield axios_1.default["get"](endpoint.url, { params });
                const data = response.data;
                if (data) {
                    images = this.translateImages(data);
                    results = {
                        totalCount: this.getTotal(data),
                        count: this.getCount(data),
                        offset: this.getOffset(data),
                        images
                    };
                }
            }
            catch (e) {
                return Promise.reject(e);
            }
            return Promise.resolve(results);
        });
    }
}
exports.default = DatasourceAdapter;
//# sourceMappingURL=adapter.js.map