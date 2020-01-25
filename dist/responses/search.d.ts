import express from "express";
import Config from "../config";
declare const _default: (req: express.Request<import("express-serve-static-core").ParamsDictionary>, res: express.Response, next: express.NextFunction, config: Config) => Promise<void> | express.Response;
export default _default;
