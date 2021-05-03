import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import "./App.css"

import { Provider, useSelector } from "react-redux"
import store from "./store/index"
import { selectIsAuthenticated } from "./store/profileSlice"

import Login from "./modules/auth/pages/Login"
import Main from "./modules/main/pages/Main"

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>

					<PrivateRoute path="/">
						<Main />
					</PrivateRoute>
				</Switch>
			</Router>
		</Provider>
	)
}

function PrivateRoute({ children, ...rest }: { children: any; [k: string]: any }) {
	const isAuthenticated = useSelector(selectIsAuthenticated)

	const notAuthComponent = (location: string) => <Redirect to={{ pathname: "/login", state: { from: location } }} />

	return <Route {...rest} render={({ location }: any) => (isAuthenticated ? children : notAuthComponent(location))} />
}

export default App
