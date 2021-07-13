export interface IInvite {
    _id?: String;
    server: String;
    permanent: Boolean;
    timeout?: Date;
    inviteCode: String
}