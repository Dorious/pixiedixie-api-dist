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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_1 = require("./adapter");
class DataSources {
    constructor(config, list) {
        this.list = [];
        this.config = null;
        this.getConfig = () => this.config;
        this.getDefaultList = () => Object.keys(this.getConfig().get('dataSources'));
        this.sortResults = (a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1;
        this.config = config;
        this.list = list || this.getDefaultList();
    }
    getDataSources() {
        const ds = [];
        return new Promise((res, rej) => {
            let count = 0;
            this.list.forEach((name) => {
                Promise.resolve().then(() => __importStar(require(`./${name}`))).then((module) => {
                    ds.push(module.default);
                    count++;
                    if (count === this.list.length) {
                        res(ds);
                    }
                }).catch((err) => {
                    rej(`Can't import Adapter for '${name}'`);
                });
            });
        });
    }
    search(q, offset = 0, count = adapter_1.DEFAULT_COUNT) {
        return __awaiter(this, void 0, void 0, function* () {
            const ds = yield this.getDataSources();
            let results = null;
            for (const DatasourceClass of Object.values(ds)) {
                const datasource = new DatasourceClass(this.getConfig());
                const data = yield datasource.search(q, offset, count);
                if (data.error instanceof Error) {
                    return Promise.resolve(data);
                }
                results = this.mergeResults(results, data);
            }
            return Promise.resolve(results);
        });
    }
    images(offset = 0, count = adapter_1.DEFAULT_COUNT) {
        return __awaiter(this, void 0, void 0, function* () {
            const ds = yield this.getDataSources();
            let results = null;
            for (const DatasourceClass of Object.values(ds)) {
                const datasource = new DatasourceClass(this.getConfig());
                const data = yield datasource.images(offset, count);
                if (data.error instanceof Error) {
                    return Promise.reject(data.error);
                }
                results = this.mergeResults(results, data);
            }
            return Promise.resolve(results);
        });
    }
    mergeResults(resultsA, resultsB) {
        let results = resultsA;
        if (!results) {
            results = resultsB;
        }
        else {
            results.totalCount += resultsB.totalCount;
            results.count += resultsB.count;
            results.images = results.images.concat(resultsB.images);
        }
        results.images.sort(this.sortResults);
        return results;
    }
}
exports.default = DataSources;
//# sourceMappingURL=index.js.map