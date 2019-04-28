export class UserModel {
    public gameNumber: number = 0;

    public toAddUser() {
        return {
            gameNumber: this.gameNumber,
        };
      }
}
