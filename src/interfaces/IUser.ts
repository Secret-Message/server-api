export interface IUser {
    _id?: String;
    firebaseUid: String;
    frinedCode: Number;
    avataUrl?: String;
    joinDate?: Date;
    status?: "online" | "afk" | "dnd" | "hidden" | "frankoslaw";
    customStatus?: String
}