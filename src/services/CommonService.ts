import { Response } from "express";
import { CustomResponse, response_status_codes } from "../interfaces/ICommon";

export interface CRUD {
    create: (params: any, callback: Function) => void;
    getOne: (query: any, callback: Function) => void;
    getMany?: (query: any, callback: Function,  limit?: number, skip?: number) => void;
    update: (params: any, callback: Function) => void;
    delete: (_id: String, callback: Function) => void;
}

export function notWorkingYet(message: string, res: Response | CustomResponse) {
    res.status(response_status_codes.notWorkingYet).json({
        STATUS: "NOT IMPLEMENTED",
        MESSAGE: message
    });
}

export function successResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        STATUS: "SUCCESS",
        MESSAGE: message,
        DATA
    });
}

export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        STATUS: "FAILURE",
        MESSAGE: message,
        DATA
    });
}

export function insufficientParameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        STATUS: "FAILURE",
        MESSAGE: "Insufficient parameters",
        DATA: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        STATUS: "FAILURE",
        MESSAGE: "MongoDB error",
        DATA: err
    });
}