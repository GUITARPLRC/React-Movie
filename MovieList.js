import React, { Component } from 'react';
import './movielist.css';
import MovieCard from './MovieCard';

export default class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			el: props.ListType
		}
	}

	moveLeft = () => {
		const list = document.getElementById(this.state.el);
		var val = (parseInt(list.style.left, 10) || 0 ) + 300;
		if (parseInt(list.style.left, 10) >= 0) {
			return
		} else {
			list.style.left = val +'px';
		}
	}

	moveRight = () => {
		const list = document.getElementById(this.state.el);
		var val = (parseInt(list.style.left, 10) || 0) - 300;
		if (parseInt(list.style.left, 10) <= -6500) {
			return
		} else {
			list.style.left = val +'px';
		}
	}

	render() {
		var movies = this.props.movies;

		var styleLeft = {
			left: '0px'
		}
		return (
			<div>
				<div id={this.state.el} className="movieList" style={styleLeft}>
					{movies.map( (each, key) => {
						return (
							<MovieCard backdrop={each.backdrop_path} poster={each.poster_path} title={each.title}
								overview={each.overview} release={each.release_date} key={key} />
						)
					})}
				</div>
				<div className='carouselButtons'>
					<button id={this.state.el+'LeftButton'} onClick={this.moveLeft}>&#x3c;</button>
					<button onClick={this.moveRight}>&#x3e;</button>
				</div>
			</div>
		)
	}
}
