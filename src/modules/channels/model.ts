import { IPermission_overwrite } from "../permission_overwrites/model";
import { IMessage } from "../messages/model";

export interface IChannel {
    _id?: String;
    name: String;
    voice: Boolean;
    messages: IMessage[];
    permission_overwrites: IPermission_overwrite[];
    number: Number
}