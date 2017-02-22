import React, { Component } from 'react';
import './header.css';

export default class Header extends Component {
	render() {
		return (
			<div id='title'>
				<a href=''>
					<span className="glyphicon glyphicon-film"></span>
					<h1>Movie Search</h1>
				</a>
			</div>
		);
	}
};
