export interface IUser {
    _id?: String;
    firebase_uid: String;
    friend_code?: Number;
    avatar_url?: String;
    join_date?: Date;
    status?: String;
    custom_status?: String;
    friend_requests?: IUser[];
    friends?: IUser[]
}