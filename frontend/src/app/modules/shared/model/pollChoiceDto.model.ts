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

export interface PollChoiceDto {
  poll: PollDto;
  choices: ChoiceDto[];
}
