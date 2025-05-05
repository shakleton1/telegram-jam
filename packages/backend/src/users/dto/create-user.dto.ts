import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    telegramId: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty({ required: false })
    lastName?: string;

    @ApiProperty({ required: false })
    username?: string;

    @ApiProperty({ required: false })
    photoUrl?: string;
} 