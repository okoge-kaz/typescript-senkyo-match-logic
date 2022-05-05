import {
	PartyAnswerForEachQuestion,
	PoliticianAnswerForEachQuestion,
	UserAnswerForEachQuestion,
} from "../class/answer";
import { MatchingResult, MatchingScoreByCategory } from "../class/matching";
import convertOpinionDistanceToMatchingScore from "./calculateOpinionDistance";

interface MatchingResultResponse {
	totalMatchingScore: number;
	matchingScoreByCategory: MatchingScoreByCategory;
}
const calculateMatchingScore = (
	userSelectThemes: string[],
	userAnswerDataList: UserAnswerForEachQuestion[],
	targetAnswerDataList:
		| PartyAnswerForEachQuestion[]
		| PoliticianAnswerForEachQuestion[],
	target: string
): MatchingResultResponse => {
	/*
  Args:
    userSelectThemes: string[] 
        ユーザーが選択したテーマ
    userAnswerDataList: UserAnswerForEachQuestion[] 
        ユーザーが選択した回答
    targetAnswerDataList: PartyAnswerForEachQuestion[] | PoliticianAnswerForEachQuestion[]
        対象が選択した回答
    target: string
        対象となる回答のタイプ

  Returns:

   */

	const themes: string[] = [
		"税金・財政",
		"医療・教育",
		"国のしくみ",
		"外交・防衛",
		"インフラ",
		"日々のくらし",
	];

	const matchingResult: MatchingResult = new MatchingResult(userSelectThemes);
	// 各何点で標準化するのかを決める
	matchingResult.setMatchingScoreStandard(5);

	for (let index = 0; index < userAnswerDataList.length; index++) {
		const userAnswerData: UserAnswerForEachQuestion = userAnswerDataList[index];

		if (
			target === "party" &&
			targetAnswerDataList[index] instanceof PartyAnswerForEachQuestion
		) {
			const partyAnswerData: PartyAnswerForEachQuestion =
				targetAnswerDataList[index];

			const userAnswerDataCategory: string = userAnswerData.category;
			const partyAnswerDataCategory: string = partyAnswerData.category;
			const userAnswerDataAnswerValue: number = userAnswerData.userAnswerValue;
			const partyAnswerDataAnswerValue: number =
				partyAnswerData.partyAnswerValue;
			const userAnswerDataAnswerValueSize: number =
				userAnswerData.answerValueSize;
			const partyAnswerDataAnswerValueSize: number =
				partyAnswerData.answerValueSize;

			if (userAnswerDataCategory === partyAnswerDataCategory) {
				// user側の回答とparty側の回答が同じカテゴリの場合 -> マッチ度を計算する
				matchingResult.addValueToMatchingResultByKeyword(
					userAnswerDataCategory,
					convertOpinionDistanceToMatchingScore(
						Math.abs(userAnswerDataAnswerValue - partyAnswerDataAnswerValue),
						userAnswerDataAnswerValueSize,
						partyAnswerDataAnswerValueSize
					)
				);
				// マッチ度を計算した項目のカウントを増やす
				matchingResult.incrementKeywordMatchingCount(userAnswerDataCategory);
			} else {
				console.log(Error("category is not match"));
			}
		} else if (
			target === "politician" &&
			targetAnswerDataList[index] instanceof PoliticianAnswerForEachQuestion
		) {
			const politicianAnswerData: PoliticianAnswerForEachQuestion =
				targetAnswerDataList[index];

			const userAnswerDataCategory: string = userAnswerData.category;
			const politicianAnswerDataCategory: string =
				politicianAnswerData.category;
			const userAnswerDataAnswerValue: number = userAnswerData.userAnswerValue;
			const politicianAnswerDataAnswerValue: number =
				politicianAnswerData.politicianAnswerValue;
			const userAnswerDataAnswerValueSize: number =
				userAnswerData.answerValueSize;
			const politicianAnswerDataAnswerValueSize: number =
				politicianAnswerData.answerValueSize;

			if (userAnswerDataCategory === politicianAnswerDataCategory) {
				// user側の回答とpolitician側の回答が同じカテゴリの場合 -> マッチ度を計算する
				matchingResult.addValueToMatchingResultByKeyword(
					userAnswerDataCategory,
					convertOpinionDistanceToMatchingScore(
						Math.abs(
							userAnswerDataAnswerValue - politicianAnswerDataAnswerValue
						),
						userAnswerDataAnswerValueSize,
						politicianAnswerDataAnswerValueSize
					)
				);
				// マッチ度を計算した項目のカウントを増やす
				matchingResult.incrementKeywordMatchingCount(userAnswerDataCategory);
			} else {
				console.log(Error("category is not match"));
			}
		} else {
			console.log(Error("target is not match"));
		}
	}

	const totalMatchingScore: number = matchingResult.getTotalMatchingScore();
	const matchingScoreByCategory: MatchingScoreByCategory =
		new MatchingScoreByCategory(matchingResult);

	return {
		totalMatchingScore: totalMatchingScore, // 合計マッチ度
		matchingScoreByCategory: matchingScoreByCategory, // カテゴリごとのマッチ度
	};
};

export default calculateMatchingScore;
