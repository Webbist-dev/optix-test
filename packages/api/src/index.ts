import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: () => void) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

interface Company {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  reviews: number[];
  filmCompanyId: number;
  cost: string;
  releaseYear: number;
}

const generateCompanies = (num: number): Company[] => {
  return Array.from({ length: num }, (_, i) => ({
    id: i + 1,
    name: faker.company.name(),
  }));
};

const generateMovies = (num: number, companies: Company[]): Movie[] => {
  return Array.from({ length: num }, (_, i) => ({
    id: i + 1,
    title: faker.commerce.productName(),
    reviews: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () =>
      faker.number.int({ min: 1, max: 10 })
    ),
    filmCompanyId: faker.number.int({
      min: 1,
      max: companies.length,
    }),
    cost: faker.commerce.price(),
    releaseYear: faker.date.past({ years: 20 }).getFullYear(),
  }));
};

const NUM_COMPANIES = parseInt(process.env.NUM_COMPANIES || "5");
const NUM_MOVIES = parseInt(process.env.NUM_MOVIES || "20");

const movieCompanyData = generateCompanies(NUM_COMPANIES);
const movieData = generateMovies(NUM_MOVIES, movieCompanyData);

function shouldSimulateError() {
  return process.env.SIMULATE_ERRORS === "true" && Math.random() < 0.2;
}

app.get("/movies", (req: Request, res: Response) => {
  if (shouldSimulateError()) {
    res.status(500).send({ error: "Simulated server error" });
  } else {
    res.send(movieData);
  }
});

app.get("/movieCompanies", (req: Request, res: Response) => {
  if (shouldSimulateError()) {
    res.status(500).send({ error: "Simulated server error" });
  } else {
    res.send(movieCompanyData);
  }
});

app.post("/submitReview", (req: Request, res: Response) => {
  const { movieId, review } = req.body as { movieId: number; review: number };
  if (!movieId || typeof review !== "number") {
    res.status(400).send({ message: "Invalid input data" });
    return;
  }

  const movie = movieData.find((movie) => movie.id === movieId);
  if (!movie) {
    res.status(404).send({ message: "Movie not found" });
    return;
  }

  movie.reviews.push(review);
  res.send({ message: "Thank you for your review!" });
});

app.listen(process.env.PORT || 3000);
