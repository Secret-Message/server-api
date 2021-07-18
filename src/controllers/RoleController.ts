import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { CustomRequest } from '../interfaces/ICommon'

export class RoleController {

    public getMemberRoles(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public getServerRoles(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public createRole(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public updateRole(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public deleteRole(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public assignRoleToMember(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public removeRoleFromMember(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }
}