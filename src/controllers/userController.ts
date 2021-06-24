import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');

export class UserController {
    public getSharedServers(req: Request, res: Response ) {
        if (req.body.Token ) {
            successResponse('Logged in', "", res);
        } else {
            insufficientParameters(res);
        }
    }

    public getSharedFriends(req: Request, res: Response ) {
        if (req.body.Token ) {
            successResponse('Logged in', "", res);
        } else {
            insufficientParameters(res);
        }
    }

    public deleteUser(req: Request, res: Response ) {
        if (req.body.Token ) {
            successResponse('Logged in', "", res);
        } else {
            insufficientParameters(res);
        }
    }

    public updateUser(req: Request, res: Response ) {
        if (req.body.Token ) {
            successResponse('Logged in', "", res);
        } else {
            insufficientParameters(res);
        }
    }

    public getUserByFriendCode(req: Request, res: Response ) {
        if (req.body.Token ) {
            successResponse('Logged in', "", res);
        } else {
            insufficientParameters(res);
        }
    }

    public getUserById(req: Request, res: Response ) {
        if (req.body.Token ) {
            successResponse('Logged in', "", res);
        } else {
            insufficientParameters(res);
        }
    }
}