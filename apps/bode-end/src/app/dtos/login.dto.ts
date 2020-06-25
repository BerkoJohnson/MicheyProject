import { IsString, IsEmail } from "class-validator";

class LogInDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export default LogInDto;
