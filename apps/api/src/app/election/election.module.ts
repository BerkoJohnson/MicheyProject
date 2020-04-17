import { Module } from '@nestjs/common';
import { ElectionService } from './election.service';
import { ElectionController } from './election.controller';
import { PositionController } from './position/position.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ElectionSchama } from './election.schema';
import { PositionSchama } from './position/position.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'Election',
      schema: ElectionSchama
    },
    {
      name: 'Position',
      schema: PositionSchama
    }
  ])],
  providers: [ElectionService],
  controllers: [ElectionController, PositionController]
})
export class ElectionModule { }
