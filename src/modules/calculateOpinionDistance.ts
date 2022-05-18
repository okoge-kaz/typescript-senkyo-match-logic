const convertOpinionDistanceToMatchingScore = async (
	opinionDistance: number,
	userAnswerDataAnswerValueSize: number,
	targetAnswerDataAnswerValueSize: number
): Promise<number> => {
	/*
  意見距離をマッチングスコアに変換する
  */
  if (userAnswerDataAnswerValueSize !== targetAnswerDataAnswerValueSize) {
    console.log(userAnswerDataAnswerValueSize, targetAnswerDataAnswerValueSize)
		throw new Error(
			"userAnswerDataAnswerValueSize !== targetAnswerDataAnswerValueSize"
		);
	} else {
		const answerSize: number = userAnswerDataAnswerValueSize;
		const scalingValue: number = 5 / answerSize;

		switch (opinionDistance) {
      case 0:
        return 5 * scalingValue;
      case 1:
        return 4 * scalingValue;
      case 2:
        return 3 * scalingValue;
      case 3:
        return 2 * scalingValue;
      case 4:
        return 1 * scalingValue;
      case 5:
        return 0 * scalingValue;
      default:
        throw new Error("opinionDistance is not match");
		}
	}
};

export default convertOpinionDistanceToMatchingScore;