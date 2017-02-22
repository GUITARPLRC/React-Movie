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
		fetch('https://api.themoviedb.org/3/discover/movie?api_key=c4caddf3d2f1e3a21633c2611179f2e4' +
		'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2016-12-31&with_genres=28')
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
				<h2>Action Movies</h2>
				<MovieList movies={movies} ListType='actionList'/>
			</div>
		)}
};
