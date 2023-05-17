import React, { useState, useRef } from 'react';
import axios from 'axios';
import AutoComplete from './AutoComplete';
import MovieTemplate from './MovieTemplate';
import 'bulma/css/bulma.min.css';

const MovieFight = () => {
	const [inputValue1, setInputValue1] = useState('');
	const [inputValue2, setInputValue2] = useState('');
	const [movies1, setMovies1] = useState([]);
	const [movies2, setMovies2] = useState([]);
	const [selectedMovie1, setSelectedMovie1] = useState(null);
	const [selectedMovie2, setSelectedMovie2] = useState(null);
	const [hasUserInput, setHasUserInput] = useState(false);
	const dropdownRef = useRef(null);

	const onUserInput = () => {
		setHasUserInput(true);
	};

	const setInputValue = (inputValue, player) => {
		if (player === 1) {
			setInputValue1(inputValue);
		} else {
			setInputValue2(inputValue);
		}
	};

	const onInputChange1 = (event) => {
		setInputValue1(event.target.value);
	};

	const onInputChange2 = (event) => {
		setInputValue2(event.target.value);
	};

	const onMovieSelect1 = async (movie) => {
		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: '45f96c6',
				i: movie.imdbID,
			},
		});
		setSelectedMovie1(response.data);
	};

	const onMovieSelect2 = async (movie) => {
		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: '45f96c6',
				i: movie.imdbID,
			},
		});
		setSelectedMovie2(response.data);
	};

	// Comparing variables
	let isMovie1WinningAwards;
	let isMovie1WinningBoxOffice;
	let isMovie1WinningMetascore;
	let isMovie1WinningImdbRating;
	let isMovie1WinningImdbVotes;
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
		isMovie1WinningAwards = awards1 > awards2;
	}
	// Compare Box Office
	if (selectedMovie1 && selectedMovie2) {
		const boxOffice1 =
			selectedMovie1.BoxOffice &&
			parseInt(selectedMovie1.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
		const boxOffice2 =
			selectedMovie2.BoxOffice &&
			parseInt(selectedMovie2.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
		isMovie1WinningBoxOffice = boxOffice1 > boxOffice2;
	}

	// Compare Metascore
	if (selectedMovie1 && selectedMovie2) {
		const metascore1 =
			selectedMovie1.Metascore && parseInt(selectedMovie1.Metascore);
		const metascore2 =
			selectedMovie2.Metascore && parseInt(selectedMovie2.Metascore);
		isMovie1WinningMetascore = metascore1 > metascore2;
	}

	// Compare imdbRating
	if (selectedMovie1 && selectedMovie2) {
		const imdbRating1 =
			selectedMovie1.imdbRating && parseInt(selectedMovie1.imdbRating);
		const imdbRating2 =
			selectedMovie2.imdbRating && parseInt(selectedMovie2.imdbRating);
		isMovie1WinningImdbRating = imdbRating1 > imdbRating2;
	}

	// Compare imdbVotes
	if (selectedMovie1 && selectedMovie2) {
		const imdbVotes1 =
			selectedMovie1.imdbVotes &&
			parseInt(selectedMovie1.imdbVotes.replace(/,/g, ''));
		const imdbVotes2 =
			selectedMovie2.imdbVotes &&
			parseInt(selectedMovie2.imdbVotes.replace(/,/g, ''));
		isMovie1WinningImdbVotes = imdbVotes1 > imdbVotes2;
	}

	return (
		<div className="container">
			<div className="columns">
				<div className="column is-half">
					<div className="left-autocomplete">
						<AutoComplete
							inputValue={inputValue1}
							onInputChange={onInputChange1}
							movies={movies1}
							onMovieSelect={onMovieSelect1}
							selectedMovie={selectedMovie1}
							setSelectedMovie={setSelectedMovie1}
							dropdownRef={dropdownRef}
							placeholder="Enter a movie title for player 1"
							onUserInput={onUserInput}
						/>
						{selectedMovie1 && (
							<MovieTemplate
								selectedMovie={selectedMovie1}
								selectedMovie1={selectedMovie1}
								selectedMovie2={selectedMovie2}
							/>
						)}
					</div>
				</div>
				<div className="column is-half">
					<div className="right-autocomplete">
						<AutoComplete
							inputValue={inputValue2}
							onInputChange={onInputChange2}
							movies={movies2}
							onMovieSelect={onMovieSelect2}
							selectedMovie={selectedMovie2}
							setSelectedMovie={setSelectedMovie2}
							dropdownRef={dropdownRef}
							placeholder="Enter a movie title for player 2"
							onUserInput={onUserInput}
						/>
						{selectedMovie1 && (
							<MovieTemplate
								selectedMovie={selectedMovie2}
								selectedMovie1={selectedMovie1}
								selectedMovie2={selectedMovie2}
							/>
						)}
					</div>
				</div>
			</div>
			{hasUserInput ? null : (
				<div className="columns is-centered">
					<div className="column is-half">
						<div className="notification is-info tutorial has-text-centered">
							<h1 className="title">Search For a Movie on Both Sides</h1>
							<p className="subtitle">Let us help you decide!</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MovieFight;
