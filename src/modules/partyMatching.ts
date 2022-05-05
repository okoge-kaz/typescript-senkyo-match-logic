import { PartyAnswerForEachQuestion, UserAnswerForEachQuestion } from "../class/answer";
import calculateMatchingScore from "./calculateMatchingScore";

const calculatePartyMatchingScore = (userSelectThemes: string[], userAnswerDataList: UserAnswerForEachQuestion[]) => {
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
  
  const partyMatchScoreResult: Object = {};
  const partyThemeBasedMatchScoreResult: Object = {};

  partyList.forEach((party) => { 
    
  })
}