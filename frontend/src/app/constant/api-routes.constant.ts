import {environment} from "../../environments/environment";

export class ApiRoutesConstant {
  public static BASE_URL = environment.apiUrl;

  public static AUTH = '/auth';
  public static POLL = '/polls';
  public static PUBLIC = '/public';
  public static PARTICULAR = '/particular';

  public static LOGIN = '/login';
  public static SIGNUP = '/signup';
  public static LOGOUT = '/logout';

  public static CREATE = '/create';
  public static UPDATE = '/update';
  public static DELETE = '/delete';
}
