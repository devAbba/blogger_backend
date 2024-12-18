import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";
// import { Article } from "@prisma/client";

export class ArticleEntity {
    constructor({ author, ...data }: Partial<ArticleEntity>) {
        Object.assign(this, data);

        if (author) {
        this.author = new UserEntity(author);
        }
    }
    
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false, nullable: true })
    description: string | null;

    @ApiProperty()
    body: string;

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ required: false, nullable: true})
    authorId: string | null;

    @ApiProperty({ required: false, type: UserEntity })
    author?: UserEntity;

}
