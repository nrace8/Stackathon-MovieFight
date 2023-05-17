import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import axios from 'axios';


const initialState = {
  movies: [],
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_SUCCESS':
      return { ...state, movies: action.payload, error: null };
    case 'FETCH_MOVIES_FAILURE':
      return { ...state, movies: [], error: action.payload };
    default:
      return state;
  }
};

export const fetchMovies = () => async (dispatch) => {
  try {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '45f96c6',
        s: searchTerm
      }
    });
    dispatch({ type: 'FETCH_MOVIES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message });
  }
};

const reducer = combineReducers({
  movieReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
