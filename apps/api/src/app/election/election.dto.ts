import { IsString } from "class-validator";

export class CreateElectionDto {
    @IsString()
    title: string;

    @IsString()
    school: string;
    
    @IsString()
    academicYear: string;
}