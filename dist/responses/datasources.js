"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next, config) => {
    return res.send({
        data: config.get("dataSources")
    });
};
//# sourceMappingURL=datasources.js.map