export class SetJWTToken {
  public static type = '[AuthState] Set JWT Token';

  constructor(public readonly payload: string) {
  }
}

export class ClearAuthState {
  public static type = '[AuthState] Clear Auth State';

  constructor() {
  }
}
