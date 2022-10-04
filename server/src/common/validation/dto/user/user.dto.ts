import {
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { Avatar } from "../../../db/models/user/user.model";
import { BaseDto, DtoGroups } from "../../dtoGroups.dto";

export class UserDtoGroups extends DtoGroups {}

export class UserDto extends BaseDto {
  @IsOptional({
    groups: [UserDtoGroups.UPDATE, UserDtoGroups.CREATE, UserDtoGroups.REGISTER],
  })
  @IsObject({
    groups: [UserDtoGroups.UPDATE, UserDtoGroups.CREATE, UserDtoGroups.REGISTER],
  })
  avatar?: Avatar;

  @IsOptional({
    groups: [UserDtoGroups.UPDATE, UserDtoGroups.CREATE, UserDtoGroups.REGISTER],
  })
  @IsString({
    groups: [UserDtoGroups.UPDATE, UserDtoGroups.CREATE, UserDtoGroups.REGISTER],
  })
  fullName?: string;

  @IsOptional({
    groups: [UserDtoGroups.UPDATE],
  })
  @IsString({
    groups: [
      UserDtoGroups.CREATE,
      UserDtoGroups.REGISTER,
      UserDtoGroups.UPDATE,
      UserDtoGroups.LOGIN,
    ],
  })
  @MinLength(5, {
    groups: [
      UserDtoGroups.CREATE,
      UserDtoGroups.REGISTER,
      UserDtoGroups.UPDATE,
      UserDtoGroups.LOGIN,
    ],
  })
  @MaxLength(30, {
    groups: [
      UserDtoGroups.CREATE,
      UserDtoGroups.REGISTER,
      UserDtoGroups.UPDATE,
      UserDtoGroups.LOGIN,
    ],
  })
  username: string;

  @IsOptional({
    groups: [UserDtoGroups.UPDATE],
  })
  @IsString({
    groups: [
      UserDtoGroups.CREATE,
      UserDtoGroups.REGISTER,
      UserDtoGroups.UPDATE,
      UserDtoGroups.LOGIN,
    ],
  })
  @MinLength(4, {
    groups: [
      UserDtoGroups.CREATE,
      UserDtoGroups.REGISTER,
      UserDtoGroups.UPDATE,
      UserDtoGroups.LOGIN,
    ],
  })
  password: string;

  @IsOptional({
    groups: [UserDtoGroups.UPDATE, UserDtoGroups.CREATE],
  })
  @IsString({
    groups: [UserDtoGroups.UPDATE],
  })
  biography?: string;


}
