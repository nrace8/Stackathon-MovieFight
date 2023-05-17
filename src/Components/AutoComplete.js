import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AutoComplete = ({
	inputValue,
	onInputChange,
	onMovieSelect,
	dropdownRef,
	setSelectedMovie,
    onUserInput,
}) => {
	const [movies, setMovies] = useState([]);
	const timeoutRef = useRef(null);

	const fetchData = async (searchTerm) => {
		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: '45f96c6',
				s: searchTerm,
			},
		});

		if (response.data.Search) {
			setMovies(response.data.Search);
		} else {
			setMovies([]);
		}
	};

	useEffect(() => {
		clearTimeout(timeoutRef.current);

		if (inputValue) {
			timeoutRef.current = setTimeout(() => {
				fetchData(inputValue);
			}, 500);
		} else {
			setMovies([]);
		}

		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, [inputValue]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setMovies([]);
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [dropdownRef]);

	const handleMovieClick = (movie) => {
		if (dropdownRef.current.classList.contains('is-active')) {
			dropdownRef.current.classList.remove('is-active');
		}
		setSelectedMovie(movie);
		onInputChange({ target: { value: movie.Title } });
		setMovies([]);
		onMovieSelect(movie);
	};

	return (
		<div className="field">
			<label className="label">
				<b>Search for a movie</b>
			</label>
			<div className="control has-icons-right">
				<input
					className="input is-rounded"
					type="text"
					placeholder="Enter a movie title"
					value={inputValue}
					onChange={(event) => {
                        onInputChange(event);
                        onUserInput();
                      }}
				/>
				<span className="icon is-right">
					<i className="fas fa-search"></i>
				</span>
			</div>
			<div
				ref={dropdownRef}
				className={`dropdown ${movies && movies.length > 0 ? 'is-active' : ''}`}
			>
				<div className="dropdown-menu">
					<div className="dropdown-content">
						{movies &&
							movies.map((movie) => (
								<a
									href="#"
									className="dropdown-item"
									key={movie.imdbID}
									onClick={() => handleMovieClick(movie)}
								>
									<img
										src={movie.Poster === 'N/A' ? '' : movie.Poster}
										alt={movie.Title}
										style={{ width: '50px', height: 'auto' }}
									/>
									<span>{movie.Title}</span>
									<span style={{ fontStyle: 'italic' }}> ({movie.Year})</span>
								</a>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AutoComplete;
