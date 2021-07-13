import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, notWorkingYet } from '../services/CommonService';
import { IUser } from '../interfaces/IUser';
import UserService from '../services/UserService';
import FriendService from '../services/FriendService';
import MemberService from '../services/MemberService';
import { CustomRequest } from '../interfaces/ICommon'
import { IMember } from 'interfaces/IMember';
import { IFriend } from 'interfaces/IFriend';

export class UserController {

    private user_service: UserService = new UserService();
    private member_service: MemberService = new MemberService();S
    private friend_service: FriendService = new FriendService();

    public getSharedServers(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public getSharedFriends(req: Request, res: Response ) {
        notWorkingYet(null, res)
    }

    public deleteUser(req: Request, res: Response ) {
        this.user_service.delete(req.params.userId, 
            (err: any, user_data: IUser) => {
            if (err) {
                mongoError(err, res);
            }else {
                successResponse('User deleted', user_data, res);
                
            }
        })
    }

    public updateUser(req: CustomRequest, res: Response ) {
        if ( req.body.avataUrl ||
             req.body.status ||
             req.body.customStatus ) {
            this.user_service.getOne({ 
                _id: req.decoded.userId
            }, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                }else {
                    const user_params: IUser = {
                        _id: req.decoded.userId,
                        firebaseUid: user_data.firebaseUid,
                        frinedCode: user_data.frinedCode,
                        avataUrl: req.body.avataUrl ? req.body.avataUrl : user_data.avataUrl,
                        status: req.body.status ? req.body.status : user_data.status,
                        customStatus: req.body.customStatus ? req.body.customStatus : user_data.customStatus
                    };

                    this.user_service.update(user_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('Update user successfull', null, res);
                        }
                    });
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public getCurrentUserServers(req: CustomRequest, res: Response ) {
        this.member_service.getMany({ 
            user: req.decoded.userId
        }, (err: any, member_data: IMember) => {
            if (err) {
                mongoError(err, res);
            }else {
                if( member_data ){
                    successResponse('Server found', member_data, res);
                }else{
                    successResponse('You don\'t belong to any server', member_data, res);
                }
            }
        })
    }

    public getCurrentUserFriends(req: CustomRequest, res: Response ) {
        this.friend_service.getMany({ 
            you: req.decoded.userId
        }, (err: any, friend_data: IFriend) => {
            console.log(friend_data)

            if (err) {
                mongoError(err, res);
            }else {
                if( friend_data ){
                    successResponse('Friend found', friend_data, res);
                }else{
                    successResponse('You don\'t have any friends :c', friend_data, res);
                }
            }
        })
    }

    public getUserByFriendCode(req: Request, res: Response ) {
        if ( req.params.friendCode ) {
            this.user_service.getMany({ 
                frinedCode: req.params.friendCode
            }, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                }else {
                    if( user_data ){
                        successResponse('User found', user_data, res);
                    }else{
                        successResponse('User don\'t exist', user_data, res);
                    }
                }
            })
        } else {
            insufficientParameters(res);
        }
    }

    public getUserById(req: Request, res: Response ) {
        if ( req.params.userId ) {
            this.user_service.getOne({ 
                _id: req.params.userId
            }, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                }else {
                    if( user_data ){
                        successResponse('User found', user_data, res);
                    }else{
                        successResponse('User don\'t exist', user_data, res);
                    }
                }
            })
        } else {
            insufficientParameters(res);
        }
    }
}