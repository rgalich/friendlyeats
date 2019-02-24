export class UserModel {
    public static toClass(toClass: any) {
        const user = new UserModel();
        user.id = toClass.id;
        user.firstName = toClass.data().firstName;
        user.lastName = toClass.data()!.lastName;
        user.mail = toClass.data()!.mail;

        return user;
    }

    public static toPlan(toPlan: UserModel) {
        return { firstName: toPlan.firstName, lastName: toPlan.lastName, mail: toPlan.mail };
    }

    public id!: string;

    public firstName!: string;

    public lastName!: string;

    public mail!: string;
}
