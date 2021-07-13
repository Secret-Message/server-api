export interface IBan {
    _id?: String;
    server: String;
    user: String;
    reason: String;
    permanent: Boolean;
    timeout?: Date
}