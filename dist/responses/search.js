"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasources_1 = __importDefault(require("../datasources"));
const adapter_1 = require("../datasources/adapter");
exports.default = (req, res, next, config) => {
    const q = (config.get("queryParam") || {}).toString();
    const query = req.query[q];
    const reqOffset = parseInt(req.query.offset, 10);
    const reqCount = parseInt(req.query.count, 10) || adapter_1.DEFAULT_COUNT;
    // DataSources load & filtering
    const dsListParam = (config.get("dataSourcesParam") || {}).toString();
    const dsList = req.query[dsListParam];
    const datasources = new datasources_1.default(config, dsList);
    // 422 (Unprocessable Entity) Error if no query param
    if (!query) {
        res.status(422);
        return res.send({
            "status": "error",
            "message": `No search query '${q}' param set.`
        });
    }
    return datasources
        .search(query, reqOffset, reqCount)
        .then((results) => {
        const { error, totalCount, offset, count, images } = results;
        if (error instanceof Error) {
            res.status(500).send({
                status: "error",
                message: error.message,
                stack: error.stack
            });
        }
        else {
            res.send({
                status: "success",
                totalCount,
                offset,
                count,
                data: images
            });
        }
    });
};
//# sourceMappingURL=search.js.map