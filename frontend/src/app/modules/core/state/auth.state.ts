import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {ClearAuthState, SetJWTToken,} from "./auth.action";

export class AuthStateModel {
  jwtToken: string;
  authenticated: boolean;
}

const authStateDefault: AuthStateModel = {
  jwtToken: null,
  authenticated: false,
}

@State<AuthStateModel>({
  name: 'authState',
  defaults: {
    ...authStateDefault
  }
})
@Injectable()
export class AuthState {
  constructor() {
  }

  @Selector()
  static getJwtToken(state: AuthStateModel) {
    return state.jwtToken;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return state.authenticated;
  }

  @Action(SetJWTToken)
  setJwtToken(ctx: StateContext<AuthStateModel>, action: SetJWTToken) {
    const state = ctx.getState();
    let authenticated: boolean;
    if (action.payload !== null)
      authenticated = true;
    ctx.setState({...state, jwtToken: action.payload, authenticated: authenticated});
  }

  @Action(ClearAuthState)
  clearAuthState({setState}: StateContext<AuthStateModel>) {
    setState({
      ...authStateDefault
    });
  }
}
