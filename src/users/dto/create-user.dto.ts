import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty()
    password: string;
}
