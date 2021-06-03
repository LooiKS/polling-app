import {UserModel} from "./user.model";

export class PollModel {
  expirationDateTime: Date;
  question: string;
  choice: ChoiceModel[];
  vote: number;
  user: UserModel;
  createdAt: Date;
}

export class ChoiceModel {
  id: number;
  text: string;
}
