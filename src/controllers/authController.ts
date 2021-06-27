import { Request, Response, NextFunction } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import { admin } from '../utils/firebase.js';
import * as jwt from 'jsonwebtoken';
import { CustomRequest } from '../modules/common/model'

export class AuthController {

    private user_service: UserService = new UserService();

    public login(req: Request, res: Response ) {
        if (req.body.Token ) {
            admin
                .auth()
                .verifyIdToken( req.body.Token )
                .then((firebase_uid) => {
                    this.user_service.filterUser({ 
                        firebase_uid: firebase_uid.user_id
                    }, (err: any, user_data: IUser) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            if(user_data){
                                let token = jwt.sign({ userId: user_data._id }, process.env.SERVER_TOKEN, { expiresIn: "1h" })

                                res.cookie('Authorization', token, { maxAge: 86_400_000 })
                                successResponse('Logged in', user_data, res);
                            }else{
                                const user_params: IUser = {
                                    firebase_uid: firebase_uid.user_id,
                                    friend_code: Math.floor(Math.random() * 9999),
                                }

                                this.user_service.createUser(user_params, (err2: any, user_data2: IUser) => {
                                    if (err2) {
                                        mongoError(err2, res);
                                    } else {
                                        let token = jwt.sign({ userId: user_data2._id }, process.env.SERVER_TOKEN, { expiresIn: "1h" })

                                        res.cookie('Authorization', token, { maxAge: 86_400_000 })
                                        successResponse('create user successfull', user_data2, res);
                                    }
                                });
                            }
                        }
                    })
                })
                .catch((err) => {
                    mongoError(err, res);
                });
        } else {
            insufficientParameters(res);
        }
    }

    public loggedIn(req: CustomRequest, res: Response, next: NextFunction ) {
        const cookies = req.cookies || req.headers.cookie;

        if( cookies ){
            const token: String = cookies['Authorization'];

            if(token){
                jwt.verify(token, process.env.SERVER_TOKEN, (err: any, decoded: { 
                    userId: String; 
                } ) => {
                    if (err) {
                        failureResponse('Unauthorized', null, res)
                    }
        
                    if (decoded) {
        
                        this.user_service.filterUser({ 
                            _id: decoded.userId
                        }, (err2: any, user_data: IUser) => {
                            if(!user_data){
                                failureResponse('User don\'t exists', null, res)
                            }else{
                                req.decoded = decoded
                                next()
                            }
                        })
                    }
                })
            }
        } else {
            insufficientParameters(res);
        }
    }

}