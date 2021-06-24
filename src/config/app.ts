import * as express from "express";
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import environment from "../environment";
// import { CategoryRoutes } from "../routes/category_route";
// import { ChannelRoutes } from "../routes/channel_route";
import { CommonRoutes } from "../routes/common_route";
// import { FriendRoutes } from "../routes/friend_route";
// import { InviteRoutes } from "../routes/invite_route";
// import { MemberRoutes } from "../routes/member_route";
// import { MessageRoutes } from "../routes/message_route";
// import { PermissionOverwriteRoutes } from "../routes/permission_overwrite_route";
// import { RoleRoutes } from "../routes/role_route";
// import { ServerRoutes } from "../routes/server_route";
import { UserRoutes } from "../routes/user_route";
import { UtilRoutes } from "../routes/util_route"

class App {
    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();

    // private category_routes: CategoryRoutes = new CategoryRoutes();
    // private channel_routes: ChannelRoutes = new ChannelRoutes();
    private common_routes: CommonRoutes = new CommonRoutes();
    // private friend_routes: FriendRoutes = new FriendRoutes();
    // private invite_routes: InviteRoutes = new InviteRoutes();
    // private member_routes: MemberRoutes = new MemberRoutes();
    // private message_routes: MessageRoutes = new MessageRoutes();
    // private permission_overwrite_routes: PermissionOverwriteRoutes = new PermissionOverwriteRoutes();
    // private role_routes: RoleRoutes = new RoleRoutes();
    // private server_routes: ServerRoutes = new ServerRoutes();
    private user_routes: UserRoutes = new UserRoutes();
    private util_routes: UtilRoutes = new UtilRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();

        // this.category_routes.route( this.app );
        // this.channel_routes.route( this.app );
        // this.friend_routes.route( this.app );
        // this.invite_routes.route( this.app );
        // this.member_routes.route( this.app );
        // this.message_routes.route( this.app );
        // this.permission_overwrite_routes.route( this.app );
        // this.role_routes.route( this.app );
        // this.server_routes.route( this.app );
        this.user_routes.route( this.app );
        this.util_routes.route( this.app );
        this.common_routes.route( this.app );
    }

    private config(): void {
        this.app.use(cors({
            origin: ["http://localhost:80", "http://localhost:443", "http://localhost:8000"],
            optionsSuccessStatus: 200, // For legacy browser support
            credentials: true,
        }));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(require('cookie-parser')());
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    }
}

export default new App().app;