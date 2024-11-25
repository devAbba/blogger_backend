import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from 'class-transformer';
import { User } from '@prisma/client';

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
    
    @ApiProperty()
    id: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @Exclude()
    password: string;
}
