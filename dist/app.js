"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const app = express_1.default();
exports.myRouter = express_1.default.Router();
exports.config = new config_1.default();
const apiPrefix = exports.config.get("apiPrefix") || '/';
exports.getHandler = (resource) => (req, res, next) => {
    Promise.resolve().then(() => __importStar(require(`./responses/${resource}`))).then(callback => {
        const p = callback.default(req, res, next, exports.config);
        if (typeof (p.catch) === "function")
            p.catch((err) => {
                if (typeof (err) === "string") {
                    return res.status(400).send({
                        status: "error",
                        message: err,
                    });
                }
                else {
                    const status = err.response ? err.response.status : 500;
                    return res.status(status).send({
                        status: "error",
                        message: err.message,
                        stack: err.stack
                    });
                }
            });
        return p;
    });
};
// Let's use root as API Documentation.
exports.myRouter.get("/", exports.getHandler("documentation"));
// Get all datasources info.
exports.myRouter.get("/datasources", exports.getHandler("datasources"));
// Get some images for main page.
exports.myRouter.get("/images", exports.getHandler("images"));
// Search for images.
exports.myRouter.get("/search", exports.getHandler("search"));
// Setup api prefix
console.log(`Setting up "${apiPrefix}" API prefix...`);
app.use(apiPrefix, exports.myRouter);
exports.default = app;
//# sourceMappingURL=app.js.map