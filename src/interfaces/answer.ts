export interface PartyAnswerForEachQuestion {
  questionId: number;
  category: string;
  questionContent: string;
  partyAnswer: string;
  partyAnswerValue: number;
  answerValueSize: number;
}

export interface PoliticianAnswerForEachQuestion {
  questionId: number;
  category: string;
  questionContent: string;
  politicianAnswer: string;
  politicianAnswerValue: number;
  answerValueSize: number;
}

export interface UserAnswerForEachQuestion {
  questionId: number;
  category: string;
  questionContent: string;
  userAnswer: string;
  userAnswerValue: number;
  answerValueSize: number;
}