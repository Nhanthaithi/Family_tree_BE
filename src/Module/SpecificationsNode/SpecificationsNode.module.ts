import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecificationsNodeController } from './SpecificationsNode.controller';
import { SpecificationsNode } from './DB/SpecificationsNode.entity';
import { SpecificationsNodeService } from './SpecificationsNode.service';
import { SpecificationsEdgeModule } from '../SpecificationsEdge/SpecificationsEdge.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpecificationsNode]),
    SpecificationsEdgeModule,
  ],
  controllers: [SpecificationsNodeController],
  providers: [SpecificationsNodeService],
  exports: [SpecificationsNodeService, TypeOrmModule],
})
export class SpecificationsNodeModule {}
