import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

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
						<LoginWrapper />
					</Route>

					<PrivateRoute path="/">
						<MainWrapper />
					</PrivateRoute>
				</Switch>
			</Router>
		</Provider>
	)
}

const MainWrapper = () => {
	return <Main />
}

const LoginWrapper = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const loggedComponent = (location: any) => <Redirect to={{ pathname: location.state.from.pathname }} />

	return isAuthenticated ? <Route render={({ location }: any) => loggedComponent(location)} /> : <Login />
}

const PrivateRoute = ({ children, ...rest }: { children: any; [k: string]: any }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const notLoggedComponent = (location: any) => <Redirect to={{ pathname: "/login", state: { from: location } }} />

	return <Route {...rest} render={({ location }: any) => (isAuthenticated ? children : notLoggedComponent(location))} />
}

export default App
