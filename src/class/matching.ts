export class MatchingResult {
	private matchingResultTaxAndFinance: number;
	private matchingResultMedicalCareAndEducation: number;
	private matchingResultNationalStructure: number;
	private matchingResultForeignAffairAndDefense: number;
	private matchingResultInfrastructure: number;
	private matchingResultDailyLife: number;

	private matchingCountTaxAndFinance: number;
	private matchingCountMedicalCareAndEducation: number;
	private matchingCountNationalStructure: number;
	private matchingCountForeignAffairAndDefense: number;
	private matchingCountInfrastructure: number;
	private matchingCountDailyLife: number;

	private userSelectThemeKeywords: string[];
	private standardValue: number;
	private totalMatchingScore: number;

	private matchingScoreTaxAndFinance: number;
	private matchingScoreMedicalCareAndEducation: number;
	private matchingScoreNationalStructure: number;
	private matchingScoreForeignAffairAndDefense: number;
	private matchingScoreInfrastructure: number;
	private matchingScoreDailyLife: number;

	constructor(userSelectKeywords: string[]) {
		this.matchingResultTaxAndFinance = 0;
		this.matchingResultMedicalCareAndEducation = 0;
		this.matchingResultNationalStructure = 0;
		this.matchingResultForeignAffairAndDefense = 0;
		this.matchingResultInfrastructure = 0;
		this.matchingResultDailyLife = 0;

		this.matchingCountTaxAndFinance = 0;
		this.matchingCountMedicalCareAndEducation = 0;
		this.matchingCountNationalStructure = 0;
		this.matchingCountForeignAffairAndDefense = 0;
		this.matchingCountInfrastructure = 0;
		this.matchingCountDailyLife = 0;

		this.userSelectThemeKeywords = userSelectKeywords;

		this.standardValue = -10000;
		this.totalMatchingScore = 0;

		this.matchingScoreTaxAndFinance = 0;
		this.matchingScoreMedicalCareAndEducation = 0;
		this.matchingScoreNationalStructure = 0;
		this.matchingScoreForeignAffairAndDefense = 0;
		this.matchingScoreInfrastructure = 0;
		this.matchingScoreDailyLife = 0;
	}

	addValueToMatchingResultByKeyword = (
		categoryKeyword: string,
		categoryMatchingResult: number
	): void => {
		switch (categoryKeyword) {
			case "税金・財政":
				this.matchingResultTaxAndFinance += categoryMatchingResult;
			case "医療・教育":
				this.matchingResultMedicalCareAndEducation += categoryMatchingResult;
			case "国のしくみ":
				this.matchingResultNationalStructure += categoryMatchingResult;
			case "外交・防衛":
				this.matchingResultForeignAffairAndDefense += categoryMatchingResult;
			case "インフラ":
				this.matchingResultInfrastructure += categoryMatchingResult;
			case "日々のくらし":
				this.matchingResultDailyLife += categoryMatchingResult;
			default:
				break;
		}
	};

	setMatchingScoreStandard = (standardValue: number): void => {
		this.standardValue = standardValue;
	};

	getMatchingResultByKeyword = (categoryKeyword: string): number => {
		switch (categoryKeyword) {
			case "税金・財政":
				return (
					this.matchingResultTaxAndFinance / this.matchingCountTaxAndFinance
				);
			case "医療・教育":
				return (
					this.matchingResultMedicalCareAndEducation /
					this.matchingCountMedicalCareAndEducation
				);
			case "国のしくみ":
				return (
					this.matchingResultNationalStructure /
					this.matchingCountNationalStructure
				);
			case "外交・防衛":
				return (
					this.matchingResultForeignAffairAndDefense /
					this.matchingCountForeignAffairAndDefense
				);
			case "インフラ":
				return (
					this.matchingResultInfrastructure / this.matchingCountInfrastructure
				);
			case "日々のくらし":
				return this.matchingResultDailyLife / this.matchingCountDailyLife;
			default:
				return 0;
		}
	};

	incrementKeywordMatchingCount = (categoryKeyword: string): void => {
		switch (categoryKeyword) {
			case "税金・財政":
				this.matchingCountTaxAndFinance += 1;
			case "医療・教育":
				this.matchingCountMedicalCareAndEducation += 1;
			case "国のしくみ":
				this.matchingCountNationalStructure += 1;
			case "外交・防衛":
				this.matchingCountForeignAffairAndDefense += 1;
			case "インフラ":
				this.matchingCountInfrastructure += 1;
			case "日々のくらし":
				this.matchingCountDailyLife += 1;
			default:
				break;
		}
	};

	private build = (): void => {
		const keywords: string[] = [
			"税金・財政",
			"医療・教育",
			"国のしくみ",
			"外交・防衛",
			"インフラ",
			"日々のくらし",
		];

		// 選択されているテーマのキーワードは2倍で結果に効かせる
		keywords.forEach((keyword: string) => {
			this.userSelectThemeKeywords.includes(keyword)
				? (this.totalMatchingScore +=
						this.getMatchingResultByKeyword(keyword) * 2)
				: (this.totalMatchingScore += this.getMatchingResultByKeyword(keyword));
		});

		// マッチングスコアの調整(100点になるように)
		this.totalMatchingScore =
			(this.totalMatchingScore /
				(this.userSelectThemeKeywords.length +
					keywords.length * this.standardValue)) *
			100;

		// キーワードごとのマッチングスコア計算
		keywords.forEach((keyword: string) => {
			switch (keyword) {
				case "税金・財政":
					this.matchingScoreTaxAndFinance = Math.round(
						this.getMatchingResultByKeyword(keyword) * (100 / this.standardValue)
					);
				case "医療・教育":
					this.matchingScoreMedicalCareAndEducation = Math.round(
						this.getMatchingResultByKeyword(keyword) * (100 / this.standardValue)
					);
				case "国のしくみ":
					this.matchingScoreNationalStructure = Math.round(
						this.getMatchingResultByKeyword(keyword) *
							(100 / this.standardValue)
					);
				case "外交・防衛":
					this.matchingScoreForeignAffairAndDefense = Math.round(
						this.getMatchingResultByKeyword(keyword) * (100 / this.standardValue)
					);
				case "インフラ":
					this.matchingScoreInfrastructure = Math.round(
						this.getMatchingResultByKeyword(keyword) * (100 / this.standardValue)
					);
				case "日々のくらし":
					this.matchingScoreDailyLife = Math.round(
						this.getMatchingResultByKeyword(keyword) *
							(100 / this.standardValue)
					);
				default:
					break;
			}
		});
	};

	getTotalMatchingScore = (): number => {
		this.build();
		return this.totalMatchingScore;
	};

	getMatchingScoreTaxAndFinance = (): number => {
		return this.matchingScoreTaxAndFinance;
	};
	getMatchingScoreMedicalCareAndEducation = (): number => {
		return this.matchingScoreMedicalCareAndEducation;
	};
	getMatchingScoreNationalStructure = (): number => {
		return this.matchingScoreNationalStructure;
	};
	getMatchingScoreForeignAffairAndDefense = (): number => {
		return this.matchingScoreForeignAffairAndDefense;
	};
	getMatchingScoreInfrastructure = (): number => {
		return this.matchingScoreInfrastructure;
	};
	getMatchingScoreDailyLife = (): number => {
		return this.matchingScoreDailyLife;
	};
}

export class MatchingScoreByCategory {
	private matchingScoreTaxAndFinance: number;
	private matchingScoreMedicalCareAndEducation: number;
	private matchingScoreNationalStructure: number;
	private matchingScoreForeignAffairAndDefense: number;
	private matchingScoreInfrastructure: number;
	private matchingScoreDailyLife: number;

	constructor(matchingResult: MatchingResult) {
		this.matchingScoreTaxAndFinance = Math.round(
			matchingResult.getMatchingScoreTaxAndFinance()
		);
		this.matchingScoreMedicalCareAndEducation = Math.round(
			matchingResult.getMatchingScoreMedicalCareAndEducation()
		);
		this.matchingScoreNationalStructure = Math.round(
			matchingResult.getMatchingScoreNationalStructure()
		);
		this.matchingScoreForeignAffairAndDefense = Math.round(
			matchingResult.getMatchingScoreForeignAffairAndDefense()
		);
		this.matchingScoreInfrastructure = Math.round(
			matchingResult.getMatchingScoreInfrastructure()
		);
		this.matchingScoreDailyLife = Math.round(
			matchingResult.getMatchingScoreDailyLife()
		);
	}

	getMatchingScoreByCategoryDictionary = () => {
		return {
			"税金・財政": this.matchingScoreTaxAndFinance,
			"医療・教育": this.matchingScoreMedicalCareAndEducation,
      "国のしくみ": this.matchingScoreNationalStructure,
			"外交・防衛": this.matchingScoreForeignAffairAndDefense,
			"インフラ": this.matchingScoreInfrastructure,
			"日々のくらし": this.matchingScoreDailyLife,
		};
	};
}
