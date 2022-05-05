export class PartyAnswerForEachQuestion {
	questionId: number;
	category: string;
	questionContent: string;
	partyAnswer: string;
	partyAnswerValue: number;
	answerValueSize: number;
	constructor(
		questionId: number,
		category: string,
		questionContent: string,
		partyAnswer: string,
		partyAnswerValue: number,
		answerValueSize: number
	) {
		this.questionId = questionId;
		this.category = category;
		this.questionContent = questionContent;
		this.partyAnswer = partyAnswer;
		this.partyAnswerValue = partyAnswerValue;
		this.answerValueSize = answerValueSize;
	}
}

export class PoliticianAnswerForEachQuestion {
	questionId: number;
	category: string;
	questionContent: string;
	politicianAnswer: string;
	politicianAnswerValue: number;
	answerValueSize: number;
	constructor(
		questionId: number,
		category: string,
		questionContent: string,
		politicianAnswer: string,
		politicianAnswerValue: number,
		answerValueSize: number
	) {
		this.questionId = questionId;
		this.category = category;
		this.questionContent = questionContent;
		this.politicianAnswer = politicianAnswer;
		this.politicianAnswerValue = politicianAnswerValue;
		this.answerValueSize = answerValueSize;
	}
}

export class UserAnswerForEachQuestion {
	questionId: number;
	category: string;
	questionContent: string;
	userAnswer: string;
	userAnswerValue: number;
	answerValueSize: number;

	constructor(
		questionId: number,
		category: string,
		questionContent: string,
		userAnswer: string,
		userAnswerValue: number,
		answerValueSize: number
	) {
		this.questionId = questionId;
		this.category = category;
		this.questionContent = questionContent;
		this.userAnswer = userAnswer;
		this.userAnswerValue = userAnswerValue;
		this.answerValueSize = answerValueSize;
	}
}
