export const enum CreateUserWithEmailAndPasswordEnum {
    Success = 1,
    EmailAlreadyInUse = 'auth/email-already-in-use',
    InvalidEmail = 'auth/invalid-email',
    OperationNotAllowed = 'auth/operation-not-allowed',
    WeakPassword = 'auth/weak-password',
}
