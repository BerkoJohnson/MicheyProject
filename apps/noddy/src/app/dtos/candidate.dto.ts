import { IsString } from "class-validator";

class CandidateDto {
  @IsString()
  name: string;

  @IsString()
  gender: string;

  @IsString()
  nickname: string;

  @IsString()
  dob: string;

  photo: Buffer;
}

export default CandidateDto;
