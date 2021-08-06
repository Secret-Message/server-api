import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ChannelModule } from './channel/channel.module';
import { FriendModule } from './friend/friend.module';
import { InviteModule } from './invite/invite.module';
import { MemberModule } from './member/member.module';
import { MessageModule } from './message/message.module';
import { PermissionModule } from './permission/permission.module';
import { PermissionOverwriteModule } from './permission-overwrite/permission-overwrite.module';
import { RoleModule } from './role/role.module';
import { ServerModule } from './server/server.module';
import { UserModule } from './user/user.module';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    ChannelModule,
    FriendModule,
    InviteModule,
    MemberModule,
    MessageModule,
    PermissionModule,
    PermissionOverwriteModule,
    RoleModule,
    ServerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}
