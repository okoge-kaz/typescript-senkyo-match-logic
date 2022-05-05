import express, { Application, Request, Response } from "express";
import { UserAnswerForEachQuestion } from "./class/answer";
import { calculatePartyMatchScore } from "./modules/partyMatch";
import { calculatePoliticianMatchScore } from "./modules/politicianMatch";

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (_req: Request, res: Response) => {
	return res.status(200).send({
		message: "Hello World!",
	});
});

app.get("/api/party/matching", async (_req: Request, res: Response) => {
	const userSelectThemes: string[] = _req.body.select_themes;
	const userAnswerDataList: UserAnswerForEachQuestion[] = _req.body.answer;

	const partyMatchingResult = calculatePartyMatchScore(
		userSelectThemes,
		userAnswerDataList
	);

	return res
		.status(200)
		.send({ partyTotalMatchScore: partyMatchingResult.partyMatchScoreResult });
});

app.get("/api/party/theme_matching", async (_req: Request, res: Response) => {
	const userSelectThemes: string[] = _req.body.select_themes;
	const userAnswerDataList: UserAnswerForEachQuestion[] = _req.body.answer;

	const partyMatchingResult = calculatePartyMatchScore(
		userSelectThemes,
		userAnswerDataList
	);

	return res.status(200).send({
		partyThemeBasedMatchScore:
			partyMatchingResult.partyThemeBasedMatchScoreResult,
	});
});

app.get("/api/politician/matching", async (_req: Request, res: Response) => {
	const userSelectThemes: string[] = _req.body.select_themes;
	const userAnswerDataList: UserAnswerForEachQuestion[] = _req.body.answer;

	const politicianMatchingResult = calculatePoliticianMatchScore(
		userSelectThemes,
		userAnswerDataList
	);

	return res.status(200).send({
		politicianTotalMatchScore:
			politicianMatchingResult.politicianMatchScoreResult,
	});
});

app.get(
	"/api/politician/theme_matching",
	async (_req: Request, res: Response) => {
		const userSelectThemes: string[] = _req.body.select_themes;
		const userAnswerDataList: UserAnswerForEachQuestion[] = _req.body.answer;

		const politicianMatchingResult = calculatePoliticianMatchScore(
			userSelectThemes,
			userAnswerDataList
		);

		return res.status(200).send({
			politicianThemeBasedMatchScore:
				politicianMatchingResult.politicianThemeBasedMatchScoreResult,
		});
	}
);

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

partyList.forEach((party) => {
	app.get(`/api/data/party/${party}/`, async (_req: Request, res: Response) => {
		const response = await fetch(
			"https://github.com/okoge-kaz/typescript-senkyo-match-logic/tree/main/data/advance/party/" +
				party +
				".json"
		);
		return res.status(200).send(await response.json());
	});
});

try {
	app.listen(PORT, () => {
		console.log(`dev server running at: http://localhost:${PORT}/`);
	});
} catch (e) {
	if (e instanceof Error) {
		console.error(e.message);
	}
}
