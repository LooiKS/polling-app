export interface VoteDto {
  id: number;
  pollID: number;
  choiceID: number;
  votedBy: String;
  votedDt: Date;
}
