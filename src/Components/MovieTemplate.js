import React from 'react';
import 'bulma/css/bulma.min.css';

const MovieTemplate = ({
	selectedMovie,
	onMovieSelect,
	selectedMovie1,
	selectedMovie2,
}) => {
	if (!selectedMovie) {
		return null;
	}

	const boxOffice =
		selectedMovie.BoxOffice &&
		parseInt(selectedMovie.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
	const metascore = selectedMovie.Metascore && parseInt(selectedMovie.Metascore);
	const imdbRating =
		selectedMovie.imdbRating && parseFloat(selectedMovie.imdbRating);
	const imdbVotes =
		selectedMovie.imdbVotes &&
		parseInt(selectedMovie.imdbVotes.replace(/,/g, ''));
	const awards =
		selectedMovie.Awards &&
		selectedMovie.Awards.split(' ').reduce((prev, word) => {
			const value = parseInt(word);
			if (isNaN(value)) {
				return prev;
			} else {
				return prev + value;
			}
		}, 0);

	// Comparison Logic
	let isSuccess = false;

	// Compare Awards
	if (selectedMovie1 && selectedMovie2) {
		const awards1 =
			selectedMovie1.Awards &&
			selectedMovie1.Awards.split(' ').reduce((prev, word) => {
				const value = parseInt(word);
				if (isNaN(value)) {
					return prev;
				} else {
					return prev + value;
				}
			}, 0);
		const awards2 =
			selectedMovie2.Awards &&
			selectedMovie2.Awards.split(' ').reduce((prev, word) => {
				const value = parseInt(word);
				if (isNaN(value)) {
					return prev;
				} else {
					return prev + value;
				}
			}, 0);
		isSuccess = awards === Math.max(awards1, awards2);
	}

	const awardsClass = isSuccess
		? 'notification is-primary'
		: 'notification is-black';

	// Compare BoxOffice
	if (selectedMovie1 && selectedMovie2) {
		const boxOffice1 =
			selectedMovie1.BoxOffice &&
			parseInt(selectedMovie1.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
		const boxOffice2 =
			selectedMovie2.BoxOffice &&
			parseInt(selectedMovie2.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
		isSuccess = boxOffice === Math.max(boxOffice1, boxOffice2);
	}

	const boxOfficeClass = isSuccess
		? 'notification is-primary'
		: 'notification is-black';

	// Compare Metascore
	if (selectedMovie1 && selectedMovie2) {
		const metascore1 =
			selectedMovie1.Metascore && parseInt(selectedMovie1.Metascore);
		const metascore2 =
			selectedMovie2.Metascore && parseInt(selectedMovie2.Metascore);
		isSuccess = metascore === Math.max(metascore1, metascore2);
	}

	const metascoreClass = isSuccess
		? 'notification is-primary'
		: 'notification is-black';

	// Compare imdbRating
	if (selectedMovie1 && selectedMovie2) {
		const imdbRating1 =
			selectedMovie1.imdbRating && parseFloat(selectedMovie1.imdbRating);
		const imdbRating2 =
			selectedMovie2.imdbRating && parseFloat(selectedMovie2.imdbRating);
		isSuccess = imdbRating === Math.max(imdbRating1, imdbRating2);
	}

	const imdbRatingClass = isSuccess
		? 'notification is-primary'
		: 'notification is-black';

	// Compare imdbVotes
	if (selectedMovie1 && selectedMovie2) {
		const imdbVotes1 =
			selectedMovie1.imdbVotes &&
			parseInt(selectedMovie1.imdbVotes.replace(/,/g, ''));
		const imdbVotes2 =
			selectedMovie2.imdbVotes &&
			parseInt(selectedMovie2.imdbVotes.replace(/,/g, ''));
		isSuccess = imdbVotes === Math.max(imdbVotes1, imdbVotes2);
	}

	const imdbVotesClass = isSuccess
		? 'notification is-primary'
		: 'notification is-black';

	console.log(selectedMovie.Ratings);

	return (
		<div>
			<article className="media">
				<figure className="media-left">
					<p className="image">
						<img
							src={selectedMovie.Poster}
							alt={selectedMovie.Title}
							style={{ width: '150px', height: 'auto' }}
						/>
					</p>
				</figure>
				<div className="media-content">
					<div className="content">
						<h1>{selectedMovie.Title}</h1>
						<h4>{selectedMovie.Genre}</h4>
						<p>{selectedMovie.Plot}</p>
					</div>
				</div>
			</article>
			<article data-value={metascore} className={metascoreClass}>
				<p className="title">{selectedMovie.Metascore} /100</p>
				<p className="subtitle">Metascore</p>
			</article>
			<article data-value={imdbRating} className={imdbRatingClass}>
				<p className="title">{selectedMovie.imdbRating} /10</p>
				<p className="subtitle">IMDB Rating</p>
			</article>
			<article data-value={imdbVotes} className={imdbVotesClass}>
				<p className="title">{selectedMovie.imdbVotes}</p>
				<p className="subtitle">IMDB Votes</p>
			</article>
			<article data-value={boxOffice} className={boxOfficeClass}>
				<p className="title">{selectedMovie.BoxOffice}</p>
				<p className="subtitle">Box Office</p>
			</article>
			<article data-value={awards} className={awardsClass}>
				<p className="title">{selectedMovie.Awards}</p>
				<p className="subtitle">Awards</p>
			</article>
		</div>
	);
};

export default MovieTemplate;
