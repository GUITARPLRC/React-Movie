import React, { Component } from 'react';
import 'whatwg-fetch';
import DetailsCard from './DetailsCard';
import Similiar from './Similiar';
import './search.css';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieId: null,
			moviedetails: null,
			ratings: "",
			inputText: "",
			searchResults: []
		}
	}

	updateInput = (e) => {
		this.setState({inputText: e.target.value});
		let url = 'https://api.themoviedb.org/3/search/movie?api_key=c4caddf3d2f1e3a21633c2611179f2e4&query=' + this.refs.searchInput.value;
		if (this.refs.searchInput.value !== "") {
			fetch(url)
				.then( (response) => response.json() )
				.then( (data) => data.results )
				.then( (myArray) => {
					for (let i = 0; i < 5; i++) {
						let result = {title:myArray[i].title, year:myArray[i].release_date.slice(0,4)};
						this.setState({searchResults: this.state.searchResults.concat(result)});
						this.setState({searchResults: this.state.searchResults.slice(-5)});
					}
				})
			}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		var input = this.refs.searchInput.value;
		//get id for movie details then get movie details
		fetch('https://api.themoviedb.org/3/search/movie?api_key=c4caddf3d2f1e3a21633c2611179f2e4&query=' + input)
			.then( (response) => response.json() )
			.then( (data) => this.setState({'movieId': data.results[0].id}) )
			.then( () => fetch('https://api.themoviedb.org/3/movie/'+ this.state.movieId +
											'?api_key=c4caddf3d2f1e3a21633c2611179f2e4&language=en-US&append_to_response=credits,releases')
										.then( (response) => response.json() )
										.then( (data) => this.setState({moviedetails: data}) )
										.then( () => { for (var i = 0, j = this.state.moviedetails.releases.countries.length; i < j; i++) {
												if (this.state.moviedetails.releases.countries[i].iso_3166_1 === "US") {
													if(this.state.moviedetails.releases.countries[i].certification === "") {
														this.setState({ratings: "N/A"});
													} else {
														this.setState({ratings: this.state.moviedetails.releases.countries[i].certification});
													}
												}
											}
										})
			)
		this.setState({inputText: ""});
}

	render() {
		return (
			<div id="search">
				<form id="searchForm" onSubmit={this.handleSubmit}>
					<input value={this.state.inputText} id="searchInput" ref="searchInput"
						 placeholder='Enter Movie Title Here' onChange={this.updateInput}/>
					<button onClick={this.props.onclick} id="searchButton">Search</button>
				</form>
				{this.state.moviedetails &&
					<DetailsCard movieId={this.state.movieId} poster={this.state.moviedetails.poster_path} title={this.state.moviedetails.title}
						overview={this.state.moviedetails.overview} release={this.state.moviedetails.release_date}
						ratings={this.state.ratings} runtime={this.state.moviedetails.runtime}
						genres={this.state.moviedetails.genres} cast={this.state.moviedetails.credits.cast} />
				}
				{this.state.movieId && <Similiar movieId={this.state.movieId} />}
			</div>
		);
	}
};
