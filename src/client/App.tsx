import React, { } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Components/home';
import Blog from './Components/blog';
import Post from './Components/post';
import Edit from './Components/edit';
import Navigation from './Components/Navigation';

const App: React.FC<IAppProps> = props => {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route exact path="/blogs/:id" component={Blog} />
				<Route exact path="/admin/edit/:id" component={Edit} />
				<Route exact path="/admin/post" component={Post} />
				<Route path="/" component={Home} />
			</Switch>
		</Router>
	)
}

export interface IAppProps { }

export default App