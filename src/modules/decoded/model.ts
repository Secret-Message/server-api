import { Request, Response } from "express"

export interface IGetUserAuth extends Request {
  decoded: any
}

export interface ISetUserAuth extends Response {
    decoded: any
  }