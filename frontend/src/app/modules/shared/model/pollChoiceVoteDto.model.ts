export interface PollDto {
  id: number;
  question: string;
  createdBy: string;
  createdDt: Date;
  expiryDt: Date;
}

export interface ChoiceDto {
  id: number;
  answer: string;
}

export interface VoteDto {
  id: number;
  pollID: number;
  choiceID: number;
  votedBy: String;
  votedDt: Date;
}

export interface PollChoiceVoteDto {
  poll: PollDto;
  choices: ChoiceDto[];
  votes: VoteDto[];
}
