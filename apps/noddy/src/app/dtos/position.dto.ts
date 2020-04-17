import { IsString } from "class-validator";

class PositionDto {
  @IsString()
  public title: string;
}

export default PositionDto;
