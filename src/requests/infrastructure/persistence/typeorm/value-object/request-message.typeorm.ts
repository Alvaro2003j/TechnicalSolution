import { Column } from "typeorm";

export class MessageTypeORM
{
    @Column('varchar', { name: 'message', length: 250, nullable: false})
    public value: string;

    private constructor(value: string)
    {
        this.value = value;
    }

    public static from(value: string): MessageTypeORM
    {
        return new MessageTypeORM(value);
    }
}