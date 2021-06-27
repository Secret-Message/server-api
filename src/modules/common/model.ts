import { Request, Response } from "express"

export enum response_status_codes {
    success = 200,
    bad_request = 400,
    internal_server_error = 500
}

export interface CustomRequest extends Request {
    decoded: any
}

export interface CustomResponse extends Response {
    decoded: any
}