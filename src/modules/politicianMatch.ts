// import fetch from "node-fetch";
import {
	PoliticianAnswerForEachQuestion,
	UserAnswerForEachQuestion,
} from "../class/answer";
import { MatchingScoreByCategory } from "../class/matching";
import { calculatePoliticianMatchingScore } from "./calculateMatchingScore";

interface PoliticianAnswer {
	question_id: number;
	category: string;
	question: string;
	politician_answer: string;
	politician_answer_value: number;
	answer_value_size: number;
}

interface MatchingResultResponse {
	totalMatchingScore: number;
	matchingScoreByCategory: MatchingScoreByCategory;
}

interface PoliticianMatchingResult {
	politicianMatchScoreResult: Map<string, number>;
	politicianThemeBasedMatchScoreResult: Map<string, Map<string, number>>;
}

const convertToPoliticianAnswerForEachQuestion = (
	questionId: number,
	category: string,
	questionContent: string,
	politicianAnswer: string,
	politicianAnswerValue: number,
	answerValueSize: number
) => {
	return new PoliticianAnswerForEachQuestion(
		questionId,
		category,
		questionContent,
		politicianAnswer,
		politicianAnswerValue,
		answerValueSize
	);
};

const getPoliticianAnswerData = async (politician: string) => {
	const response = await fetch(
		"https://github.com/okoge-kaz/typescript-senkyo-match-logic/blob/main/data/advance/politician/" +
			politician +
			".json"
	);
	const politicianAnswerDataList: PoliticianAnswer[] =
		(await response.json()) as PoliticianAnswer[];
	return politicianAnswerDataList;
};

export const calculatePoliticianMatchScore = (
	userSelectThemes: string[],
	userAnswerDataList: UserAnswerForEachQuestion[]
): PoliticianMatchingResult => {
	const politicianList: string[] = ["sample"];

	const politicianMatchScoreResult: Map<string, number> = new Map();
	const politicianThemeBasedMatchScoreResult: Map<
		string,
		Map<string, number>
	> = new Map();

	politicianList.forEach((politician) => {
		const rawPoliticianAnswerDataList = getPoliticianAnswerData(politician);
		rawPoliticianAnswerDataList.then((rawPoliticianAnswerDataList) => {
			const politicianAnswerDataList: PoliticianAnswerForEachQuestion[] =
				rawPoliticianAnswerDataList.map((politicianAnswerData) =>
					convertToPoliticianAnswerForEachQuestion(
						politicianAnswerData.question_id,
						politicianAnswerData.category,
						politicianAnswerData.question,
						politicianAnswerData.politician_answer,
						politicianAnswerData.politician_answer_value,
						politicianAnswerData.answer_value_size
					)
				);

			const matchingResult: MatchingResultResponse =
				calculatePoliticianMatchingScore(
					userSelectThemes,
					userAnswerDataList,
					politicianAnswerDataList,
					"politician"
				);

			const totalMatchingScore: number = matchingResult.totalMatchingScore;
			const matchingScoreByCategory: MatchingScoreByCategory =
				matchingResult.matchingScoreByCategory;

			politicianMatchScoreResult.set(
				politician,
				Math.round(totalMatchingScore)
			);
			politicianThemeBasedMatchScoreResult.set(
				politician,
				matchingScoreByCategory.getMatchingScoreByCategoryDictionary()
			);
		});
	});

	return {
		// value の昇順sort
		politicianMatchScoreResult: new Map(
			[...politicianMatchScoreResult].sort((key, value) => key[1] - value[1])
		),
		politicianThemeBasedMatchScoreResult: politicianThemeBasedMatchScoreResult,
	};
};
