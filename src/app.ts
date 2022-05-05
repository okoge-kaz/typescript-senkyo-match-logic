import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (_req: Request, res: Response) => {
	return res.status(200).send({
		message: "Hello World!",
	});
});

app.get("/api/party/matching", async (_req: Request, res: Response) => {});

app.get(
	"/api/party/theme_matching",
	async (_req: Request, res: Response) => {}
);

app.get("/api/politician/matching", async (_req: Request, res: Response) => {});

app.get(
	"/api/politician/theme_matching",
	async (_req: Request, res: Response) => {
		
	}
);

try {
	app.listen(PORT, () => {
		console.log(`dev server running at: http://localhost:${PORT}/`);
	});
} catch (e) {
	if (e instanceof Error) {
		console.error(e.message);
	}
}
