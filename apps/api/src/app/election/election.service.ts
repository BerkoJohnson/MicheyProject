import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Election } from './election.interface';
import { CreateElectionDto } from './election.dto';

@Injectable()
export class ElectionService {
  constructor(@InjectModel('Election') private electionModel: Model<Election>) { }

  async create(createElectionDto: CreateElectionDto): Promise<Election> {
    const createdElection = new this.electionModel(createElectionDto);
    return await createdElection.save();
  }

  async findAll(): Promise<Election[]> {
    return await this.electionModel.find().exec();
  }

  async findOne(id: string): Promise<Election> {
    return await this.electionModel.findById(id).exec();
  }

}
