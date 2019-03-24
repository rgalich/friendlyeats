export class UserWithEmailAndPasswordModel {
    public static toClass(toClass: any) {
        const userWithEmailAndPasswordModel = new UserWithEmailAndPasswordModel();
        userWithEmailAndPasswordModel.email = toClass.email;
        userWithEmailAndPasswordModel.password = toClass.password;

        return userWithEmailAndPasswordModel;
    }

    public email: string = '';

    public password: string = '';
}
