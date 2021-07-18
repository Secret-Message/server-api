import * as express from "express";
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import { CategoryRoutes } from "../routes/CategoryRoute";
import { ChannelRoutes } from "../routes/ChannelRoute";
import { CommonRoutes } from "../routes/CommonRoute";
import { FriendRoutes } from "../routes/FriendRoute";
import { InviteRoutes } from "../routes/InviteRoute";
import { MemberRoutes } from "../routes/MemberRoute";
import { MessageRoutes } from "../routes/MessageRoute";
import { PermissionOverwriteRoutes } from "../routes/PermissionOverwriteRoute";
import { RoleRoutes } from "../routes/RoleRoute";
import { ServerRoutes } from "../routes/ServerRoute";
import { UserRoutes } from "../routes/UserRoute";
import { UtilRoutes } from "../routes/UtilRoute"
require('dotenv').config();
class App {
    public app: express.Application;

    private category_routes: CategoryRoutes = new CategoryRoutes();
    private channel_routes: ChannelRoutes = new ChannelRoutes();
    private common_routes: CommonRoutes = new CommonRoutes();
    private friend_routes: FriendRoutes = new FriendRoutes();
    private invite_routes: InviteRoutes = new InviteRoutes();
    private member_routes: MemberRoutes = new MemberRoutes();
    private message_routes: MessageRoutes = new MessageRoutes();
    private permission_overwrite_routes: PermissionOverwriteRoutes = new PermissionOverwriteRoutes();
    private role_routes: RoleRoutes = new RoleRoutes();
    private server_routes: ServerRoutes = new ServerRoutes();
    private user_routes: UserRoutes = new UserRoutes();
    private util_routes: UtilRoutes = new UtilRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();

        this.category_routes.route( this.app );
        this.channel_routes.route( this.app );
        this.friend_routes.route( this.app );
        this.invite_routes.route( this.app );
        this.member_routes.route( this.app );
        this.message_routes.route( this.app );
        this.permission_overwrite_routes.route( this.app );
        this.role_routes.route( this.app );
        this.server_routes.route( this.app );
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
        mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/secret-message", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    }
}

export default new App().app;