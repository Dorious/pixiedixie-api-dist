import express from "express";
export interface IDocumentation {
    overview: string;
    handlers: {
        [propName: string]: {
            [propName: string]: {
                usage: string;
                example: string;
            };
        };
    };
}
export interface IResponse {
    documentation: IDocumentation;
}
declare const _default: (req: express.Request<import("express-serve-static-core").ParamsDictionary>, res: express.Response) => object;
/**
 * Don't have time but we could make it autogenerate the doc
 */
export default _default;
