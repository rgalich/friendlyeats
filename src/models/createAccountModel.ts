export class CreateAccountModel {
    public static toClass(toClass: any) {
        const createAccount = new CreateAccountModel();
        createAccount.email = toClass.email;
        createAccount.password = toClass.password;

        return createAccount;
    }

    public email: string = '';

    public password: string = '';
}
