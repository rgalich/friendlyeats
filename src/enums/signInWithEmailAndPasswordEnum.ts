export const enum SignInWithEmailAndPasswordEnum {
    Success = 1,
    InvalidEmail = 'auth/invalid-email',
    UserDisabled = 'auth/user-disabled',
    UserNotFound = 'auth/user-not-found',
    WrongPassword = 'auth/wrong-password',
    UnverifiedEmail = 2,
}
