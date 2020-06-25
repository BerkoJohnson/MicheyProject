import { IsString, IsEmail } from 'class-validator';

class CreateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public username: string;

  @IsString()
  public role: string;

  @IsString()
  public contact: string;
    
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export default CreateUserDto;
