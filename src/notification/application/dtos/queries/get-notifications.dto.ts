import { ApiProperty } from "@nestjs/swagger";

export class GetNotificationsDto {
    @ApiProperty()
    public id:number;
    @ApiProperty()
    public title: string;
    @ApiProperty()
    public description: string;
    @ApiProperty()
    public visible: boolean;
    @ApiProperty()
    public clientId: number
}