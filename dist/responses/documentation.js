"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const getExample = (req, uri) => {
    const apiPrefix = app_1.config.get("apiPrefix") || "/";
    return `${req.protocol}://${req.get('host')}${apiPrefix}${uri}`;
};
/**
 * Don't have time but we could make it autogenerate the doc
 */
exports.default = (req, res) => {
    const doc = {
        overview: "Basic calls for Pixie & Dixie GIFs",
        handlers: {
            "/datasources": {
                "GET": {
                    "usage": "Shows information about datasources",
                    "example": getExample(req, "/datasources")
                }
            },
            "/images": {
                "GET": {
                    "usage": "Get trending images",
                    "example": getExample(req, "/images?offset=0&count=25&datasources[]=pixabay&datasources[]=giphy")
                }
            },
            "/search": {
                "GET": {
                    "usage": "Search for images",
                    "example": getExample(req, "/search?q=YOURQUERY&offset=0&count=25&datasources[]=pixabay&datasources[]=giphy")
                }
            }
        }
    };
    const documentation = Object.assign({}, doc);
    return res.send({ documentation });
};
//# sourceMappingURL=documentation.js.map