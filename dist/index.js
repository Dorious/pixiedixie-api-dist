"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importStar(require("./app"));
const port = process.env.PIXIE_API_PORT || app_1.config.get("port");
const apiPrefix = app_1.config.get("apiPrefix") || '/';
// Run the server
app_1.default.listen(port, () => {
    console.log(`Server running @ http://localhost:${port}${apiPrefix}`);
});
//# sourceMappingURL=index.js.map