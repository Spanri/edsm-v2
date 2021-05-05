import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { Provider, useSelector } from "react-redux"
import store from "./store/index"
import { selectIsAuthenticated } from "./store/profileSlice"

import Default from "./layouts/Default"
import Auth from "./modules/auth/pages/_Index"
import Main from "./modules/main/pages/Main"

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Protected />
			</BrowserRouter>
		</Provider>
	)
}

const Protected = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	return isAuthenticated ? <MainWrapper /> : <Auth />
}

const MainWrapper = () => {
	return (
		<Switch>
			<Route path="/">
				<Default>
					<Main />
				</Default>
			</Route>
		</Switch>
	)
}

export default App
