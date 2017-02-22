import React, { Component } from 'react';
import './genre.css';

export default class Genre extends Component {
	render() {
		return (
			<p className="genre">{this.props.genre}</p>
		)
	}
};
