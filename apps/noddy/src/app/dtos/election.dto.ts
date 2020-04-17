import { IsString, IsEmail } from "class-validator";

class ElectionDto {
  @IsString()
  public title: string;

  @IsString()
  public school: string;

  @IsString()
  public academicYear: string;
}

export default ElectionDto;
