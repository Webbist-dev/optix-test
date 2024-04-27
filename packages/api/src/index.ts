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
  averageReviewScore: number;
}

const averageReviewScore = (reviews: number[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, cur) => acc + cur, 0);
  return parseFloat((sum / reviews.length).toFixed(1));
};

const generateMovies = (num: number, companies: Company[]): Movie[] => {
  return Array.from({ length: num }, (_, i) => {
    const reviews = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      () => faker.number.int({ min: 1, max: 10 })
    );
    return {
      id: i + 1,
      title: faker.commerce.productName(),
      reviews,
      filmCompanyId: faker.number.int({
        min: 1,
        max: companies.length,
      }),
      cost: faker.commerce.price(),
      releaseYear: faker.date.past({ years: 20 }).getFullYear(),
      averageReviewScore: averageReviewScore(reviews),
    };
  });
};

const generateCompanies = (num: number): Company[] => {
  return Array.from({ length: num }, (_, i) => ({
    id: i + 1,
    name: faker.company.name(),
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
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const sortBy = (req.query.sortBy as keyof Movie) || "id";
  const sortOrder = (req.query.sortOrder as "asc" | "desc") || "asc";

  if (shouldSimulateError()) {
    res.status(500).send({ error: "Simulated server error" });
    return;
  }

  const sortedMovies = movieData.sort((a: Movie, b: Movie) => {
    const normalizeValue = (value: any): string | number => {
      if (Array.isArray(value)) {
        return value.join(", ");
      }
      return value ?? "";
    };

    const aValue = normalizeValue(a[sortBy]);
    const bValue = normalizeValue(b[sortBy]);

    let result: number;
    if (typeof aValue === "number" && typeof bValue === "number") {
      result = aValue - bValue;
    } else {
      result = aValue.toString().localeCompare(bValue.toString());
    }

    if (result === 0) {
      result = a.id - b.id;
    }

    return sortOrder === "asc" ? result : -result;
  });

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedMovies = sortedMovies.slice(start, end);

  res.json({
    data: paginatedMovies,
    meta: {
      page,
      pageSize,
      count: movieData.length,
      totalPages: Math.ceil(movieData.length / pageSize),
    },
  });
});

app.get("/movieCompanies", (req: Request, res: Response) => {
  if (shouldSimulateError()) {
    res.status(500).send({ error: "Simulated server error" });
  } else {
    res.send(movieCompanyData);
  }
});

app.post("/submitReview", (req: Request, res: Response) => {
  const { movieId, rating } = req.body as { movieId: number; rating: number };
  if (!movieId || typeof rating !== "number") {
    res.status(400).send({ message: "Invalid input data" });
    return;
  }

  const movie = movieData.find((movie) => movie.id === movieId);
  if (!movie) {
    res.status(404).send({ message: "Movie not found" });
    return;
  }

  movie.reviews.push(rating);
  res.send({ message: "Thank you for your review!" });
});

app.listen(process.env.PORT || 3000);
