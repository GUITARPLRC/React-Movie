import React, { Component } from 'react';
import './moviecard.css';

export default class RecentCard extends Component {
	handleClick = () => {
		var title = this.props.title;
		var searchInput = document.getElementById('searchInput');
		searchInput.value = title;
		document.getElementById('searchButton').click();
	}

	render() {
		const imgSrc = 'https://image.tmdb.org/t/p/w500/';

		const style = {
			backgroundImage:'url('+imgSrc + this.props.backdrop+')'
		}

		return (
			<div id='card' style={style} onClick={this.handleClick}>
				<p>{this.props.title}</p>
			</div>
		);
	}
};
