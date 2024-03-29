import fetch from "cross-fetch";
import {
	PartyAnswerForEachQuestion,
	UserAnswerForEachQuestion,
} from "../class/answer";
import { MatchingScoreByCategory } from "../class/matching";
import { calculatePartyMatchingScore } from "./calculateMatchingScore";

interface PartyAnswer {
	question_id: number;
	category: string;
	question: string;
	party_answer: string;
	party_answer_value: number;
	answer_value_size: number;
}

interface MatchingResultResponse {
	totalMatchingScore: number;
	matchingScoreByCategory: MatchingScoreByCategory;
}

interface PartyMatchingResult {
	partyMatchScoreResult: Map<string, number>;
	partyThemeBasedMatchScoreResult: Map<string, Map<string, number>>;
}

const convertToPartyAnswerForEachQuestion = (
	questionId: number,
	category: string,
	questionContent: string,
	partyAnswer: string,
	partyAnswerValue: number,
	answerValueSize: number
) => {
	return new PartyAnswerForEachQuestion(
		questionId,
		category,
		questionContent,
		partyAnswer,
		partyAnswerValue,
		answerValueSize
	);
};

const getPartyAnswerData = async (party: string) => {
	const response = await fetch(
		"https://raw.githubusercontent.com/okoge-kaz/typescript-senkyo-match-logic/main/data/advance/party/" +
			party +
			".json"
	);
	const partyAnswerDataList: PartyAnswer[] =
		(await response.json()) as PartyAnswer[];
	return partyAnswerDataList;
};

export const calculatePartyMatchScore = async (
	userSelectThemes: string[],
	userAnswerDataList: UserAnswerForEachQuestion[]
): Promise<PartyMatchingResult>=> {
	const partyList: string[] = [
		"ishin",
		"kokumin",
		"komei",
		"kyosan",
		"ldp",
		"nhk",
		"ritumin",
		"syamin",
	];

	const partyMatchScoreResult: Map<string, number> = new Map();
	const partyThemeBasedMatchScoreResult: Map<
		string,
		Map<string, number>
	> = new Map();

	const calculatePartyMatching = async () => {
		partyList.forEach((party) => {
			const rawPartyAnswerDataList = getPartyAnswerData(party);
			rawPartyAnswerDataList.then((rawPartyAnswerDataList) => {
				const partyAnswerDataList: PartyAnswerForEachQuestion[] =
					rawPartyAnswerDataList.map((partyAnswerData) =>
						convertToPartyAnswerForEachQuestion(
							partyAnswerData.question_id,
							partyAnswerData.category,
							partyAnswerData.question,
							partyAnswerData.party_answer,
							partyAnswerData.party_answer_value,
							partyAnswerData.answer_value_size
						)
					);

				const matchingResult: MatchingResultResponse =
					await calculatePartyMatchingScore(
						userSelectThemes,
						userAnswerDataList,
						partyAnswerDataList,
						"party"
					);
				// console.log(matchingResult)

				const totalMatchingScore: number = matchingResult.totalMatchingScore;
				const matchingScoreByCategory: MatchingScoreByCategory =
					matchingResult.matchingScoreByCategory;

				partyMatchScoreResult.set(party, Math.round(totalMatchingScore));
				console.log(partyMatchScoreResult);
				partyThemeBasedMatchScoreResult.set(
					party,
					matchingScoreByCategory.getMatchingScoreByCategoryDictionary()
				);
			});
		});
	};

	await calculatePartyMatching();
	return {
		// value の昇順sort
		partyMatchScoreResult: new Map(
			[...partyMatchScoreResult].sort((key, value) => key[1] - value[1])
		),
		partyThemeBasedMatchScoreResult: partyThemeBasedMatchScoreResult,
	};
};
