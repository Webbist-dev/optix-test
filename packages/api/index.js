const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express()
app.use(cors());
app.use(express.json())

const movieCompanyData = [
	{ id: 1, name: "True Film Productions" },
	{ id: 2, name: "Lazy Lemon Films" },
	{ id: 3, name: "Good old TV" }
];

const movieData = [
	{ id: "1", reviews: [6, 8, 7, 9, 8, 7, 8], title: "A long train ride", filmCompanyId: "1", cost: 1020, releaseYear: 2001 },
	{ id: "2", reviews: [5, 7, 3, 4, 5, 6, 3], title: "Flowers on the meadow", filmCompanyId: "2", cost: 983, releaseYear: 1997 },
	{ id: "3", reviews: [1, 4, 5, 2, 3, 1, 2], title: "Summer", filmCompanyId: "1", cost: 7346, releaseYear: 2015 },
	{ id: "4", reviews: [6, 7, 4, 5, 6, 7, 3], title: "Back to the garden", filmCompanyId: "2", cost: 364, releaseYear: 2009 },
	{ id: "5", reviews: [2, 1, 2, 1, 3, 2, 1], title: "Mr John Smith", filmCompanyId: "3", cost: 26456, releaseYear: 2021 }
];

function shouldSimulateError() {
	return process.env.SIMULATE_ERRORS && Math.random() < 0.2;
}


app.get('/movies', (req, res) => {
	if (shouldSimulateError()) {
		res.status(500).send({ error: 'Simulated server error' });
	} else {
		res.send(movieData);
	}
});

app.get('/movieCompanies', (req, res) => {
	if (shouldSimulateError()) {
		res.status(500).send({ error: 'Simulated server error' });
	} else {
		res.send(movieCompanyData);
	}
});

app.post('/submitReview', (req, res) => {
	const { movieId, review } = req.body;
	if (!movieId || typeof review !== 'number') {
		res.status(400).send({ message: "Invalid input data" });
		return;
	}

	const movie = movieData.find(movie => movie.id === movieId);
	if (!movie) {
		res.status(404).send({ message: "Movie not found" });
		return;
	}

	movie.reviews.push(review);
	res.send({ message: "Thank you for your review!" });
});

app.listen(process.env.PORT || 3000);
