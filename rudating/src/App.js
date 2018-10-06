import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MakeProfile from './pages/MakeProfile';

import 'semantic-ui-css/semantic.min.css';
import './App.css'

class App extends Component {
	render() {
		return (
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={LandingPage}/>
						<Route path="/start" component={MakeProfile}/>
					</Switch>
				</BrowserRouter>
			)
		}
	}
	
export default App;
	