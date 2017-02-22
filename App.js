/* eslint-disable */
import React, { Component } from 'react';
import App from './App.css';
import Header from './Header';
import Search from './Search';
import RecentMovies from './RecentMovies';
import ActionMovies from './ActionMovies';
import ComedyMovies from './ComedyMovies';
import RomanceMovies from './RomanceMovies';
import DramaMovies from './DramaMovies';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayMovies: true
		}
	}

	handleRecent = () => {
		this.setState({displayMovies: false});
	}

	render() {
		return (
			<div id='main'>
				<Header />
				<Search onclick={this.handleRecent} />
				{this.state.displayMovies ? <RecentMovies /> : null}
				{this.state.displayMovies ? <ActionMovies /> : null}
				{this.state.displayMovies ? <ComedyMovies /> : null}
				{this.state.displayMovies ? <RomanceMovies /> : null}
				{this.state.displayMovies ? <DramaMovies /> : null}
			</div>
		);
	}
};
