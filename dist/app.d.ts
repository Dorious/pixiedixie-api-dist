import express from "express";
import Config from "./config";
declare const app: import("express-serve-static-core").Express;
export declare const myRouter: import("express-serve-static-core").Router;
export declare const config: Config;
export declare const getHandler: (resource: string) => (req: express.Request<import("express-serve-static-core").ParamsDictionary>, res: express.Response, next: express.NextFunction) => void;
export default app;
