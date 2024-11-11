import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config1 } from 'OrmConfigs';
import { CashTrackingModule } from './Module/CashTracking/CashTracking.module';
import { EventCalendarModule } from './Module/EventCalendar/EventCalendar.module';
import { GenealogyTreeModule } from './Module/GenealogyTree/GenealogyTree.module';

import { UserModule } from './Module/Users/Users.module';
import { SpecificationsNodeModule } from './Module/SpecificationsNode/SpecificationsNode.module';
import { SpecificationsEdgeModule } from './Module/SpecificationsEdge/SpecificationsEdge.module';
import { LikeModule } from './Module/Like/Like.module';
import { CommentModule } from './Module/Comments/Comment.module';
import { PostArticleModule } from './Module/Members/Members.module';
import { MediaFileModule } from './Module/MediaFile/MediaFile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config1),
    CashTrackingModule,
    EventCalendarModule,
    GenealogyTreeModule,
    PostArticleModule,
    LikeModule,
    MediaFileModule,
    CommentModule,
    UserModule,
    SpecificationsNodeModule,
    SpecificationsEdgeModule,
  ],
})
export class AppModule {}
