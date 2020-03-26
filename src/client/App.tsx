import React, { } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Components/home';
import Blog from './Components/blog';
import Post from './Components/post';

const App: React.FC<IAppProps> = props => {
	return (
		<Router>
			<Link to="/admin/post" className="btn btn-success">Admin</Link>
			<Switch>
				<Route exact path="/blogs/:id" component={Blog} />
				<Route exact path="/admin/post" component={Post} />
				<Route path="/" component={Home} />
			</Switch>
		</Router>
	)
}

export interface IAppProps { }

export default App