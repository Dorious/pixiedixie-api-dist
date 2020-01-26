"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** removeKeys contain which keys we don't won't to see for public */
const removeKeys = {
    dataSources: ['apiKey', 'apiKeyParam']
};
exports.defaultConfig = {
    apiPrefix: '/',
    dataSources: {},
    dataSourcesParam: "datasources",
    port: 8090,
    queryParam: "q"
};
/**
 * Class to control app configuration
 */
class Config {
    constructor(configFile = "../config.json") {
        this.config = Object.assign({}, exports.defaultConfig);
        /** Contains config with removed ${removeKeys} */
        this.configSafe = Object.assign({}, exports.defaultConfig);
        /**
         * This is ugly and should be refactor
         * Idea is too remove unwanted config keys
         */
        this.removeKeys = (config) => {
            Object.keys(config).forEach((key) => {
                if (removeKeys[key]) {
                    const thisRemoveKey = removeKeys[key];
                    Object.keys(config[key]).forEach((insideKey) => {
                        if (typeof config[key] === "object") {
                            Object.keys(config[key][insideKey]).forEach((deepKey) => {
                                if (thisRemoveKey.indexOf(deepKey) > -1)
                                    delete (config[key][insideKey][deepKey]);
                            });
                        }
                    });
                }
            });
            return config;
        };
        /**
         * Get the whole app config
         */
        this.get = (param, safe = true) => {
            const config = safe ? this.configSafe : this.config;
            return param ? config[param] : config;
        };
        this.configFile = configFile;
        const config = require(configFile);
        this.config = JSON.parse(JSON.stringify(config));
        this.configSafe = this.removeKeys(JSON.parse(JSON.stringify(config)));
    }
}
exports.default = Config;
//# sourceMappingURL=config.js.map