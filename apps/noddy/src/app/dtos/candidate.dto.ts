import { IsString, IsOptional } from 'class-validator';

class CandidateDto {
  @IsString()
  name: string;

  @IsString()
  gender: string;

  @IsString()
  nickname: string;

  @IsString()
  dob: string;

  @IsOptional()
  @IsString()
  position: string;

  photo: Buffer;
}

export default CandidateDto;
