import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class CreateArticleDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    @IsNotEmpty()
    body: string;

    @ApiProperty({ required: false, default: false })
    @IsBoolean()
    published?: boolean = false;

    @ApiProperty()
    authorId: string;
}
