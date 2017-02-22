import React, { Component } from 'react';
import 'whatwg-fetch';
import MovieList from './MovieList';

export default class RecentMovies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieList: []
		}
	}

	componentWillMount() {
		fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=c4caddf3d2f1e3a21633c2611179f2e4&language=en-US&page=1')
			.then( (response) => response.json() )
			.then( (data) => this.setState({'movieList': data.results}) );
	}

	render() {
		var movies = this.state.movieList;

		if(!movies) {
			return null;
		}
		return (
			<div id='list'>
				<h2>Recent Movies</h2>
				<MovieList movies={movies} ListType='recentList'/>
			</div>
		)}
};
