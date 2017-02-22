import React, { Component } from 'react';
import Genre from './Genre';
import './details.css';

export default class DetailsCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieId: this.props.movieId
		}
	}
	render() {
		// change to U.S. date string
		var movieYear = this.props.release.slice(0,5);
		var releaseDate = this.props.release.slice(5) + "-" + movieYear.slice(0,4);

		//change runtime from total minutes to hours and minutes
		var totalRuntime = this.props.runtime;
		var hours = Math.floor(totalRuntime / 60);
		var minutes = totalRuntime % 60;
		var cast = this.props.cast.slice(0,5);


		return (
			<Details poster={this.props.poster} title={this.props.title} releaseDate={releaseDate}
			 	ratings={this.props.ratings} genres={this.props.genres} hours={hours} minutes={minutes}
			 	overview={this.props.overview} cast={cast}/>
		)
	}
};

class Details extends Component {
	render() {
		const imgSrc = 'https://image.tmdb.org/t/p/w500/';
		return (
			<div id="detailsCard">
				<div id="content">
					<img src={imgSrc + this.props.poster} alt="movie poster" />
					<div id="content-align">
						<h3>{this.props.title}</h3>
						<p>Release Date: {this.props.releaseDate}</p>
						<p>Rated: {this.props.ratings}</p>
						<div>Genre: {this.props.genres.map(function(each, key) {
												return <Genre genre={each.name} key={key}/>;
												})}
						</div>
						<p>Runtime: {this.props.hours}h {this.props.minutes}m</p>
						<h4>Overview</h4>
						<p id="overview">{this.props.overview}</p>
					</div>
				</div>
				<div id="cast">
					<h4>Top Billed Cast</h4>
						{this.props.cast.map(function(each, key) {
							var characterNames = [];
							if (each.character.length > 40) {
								characterNames.push(each.character.substr(0,40) + '...');
							} else {
								characterNames.push(each.character);
							}
							return (
								<div id="actorsStyle" key={key}>
									<div id="actors">
											<img id="actorPic" src={imgSrc + each.profile_path} alt={"picture of "+ each.name} />
									</div>
									<p>{each.name}</p>
									<p>{characterNames}</p>
								</div>
							)
						})}
				</div>
			</div>
		)
	}
}
