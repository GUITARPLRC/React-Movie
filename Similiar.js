import React, { Component } from 'react';
import './similiar.css';
import 'whatwg-fetch';

var list = [];

export default class Similiar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieId: props.movieId,
			similiarList: []
		}
	}

	handleFetch() {
		var url = 'https://api.themoviedb.org/3/movie/'+ this.state.movieId +
		'/similar?api_key=c4caddf3d2f1e3a21633c2611179f2e4&language=en-US&page=1';
		fetch(url)
		.then( (response) => response.json())
		.then( (data) =>  this.setState({'similiarList': data.results}))

		const imagePath = 'https://image.tmdb.org/t/p/w500/';
		// only get first 6 similar movies
		var sliced = this.state.similiarList.slice(0,6);
		this.setState({'similiarList':sliced});

		list = this.state.similiarList.map( (each, index) => {
			return (
				<div className='similarCard' key={index} onClick={this.handleClick}>
					<img src={imagePath + each.poster_path} alt={each.title + ' poster'} />
					<div className="similiarDetails">
						<p>{each.title}</p>
						<p>{each.overview.slice(0,150) + '...'}</p>
					</div>
				</div>
			)
		})
	}

	componentDidMount() {
		this.handleFetch();
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.movieId !== nextProps.movieId) {
			this.setState({movieId: nextProps.movieId});
		}
		this.handleFetch();
	}

	handleClick = (e) => {
	}

	render() {
		if (list.length > 1) {
			return (
				<SimilarCard list={list} />
			)
		} else {
			return null;
		}
	}
};


class SimilarCard extends Component {
	render() {
		return (
			<div>
				<h4>Similiar Movies</h4>
				<div className='similar'>
					{this.props.list}
				</div>
			</div>
		)
	}
}
