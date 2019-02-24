import { Expose, Exclude } from 'class-transformer';

export class UserModel {
    @Exclude({ toPlainOnly: true })
    public id!: string;

    @Expose({ name: 'first' })
    public firstName!: string;

    @Expose({ name: 'last' })
    public lastName!: string;

    public mail!: string;
}
