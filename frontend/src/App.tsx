import React from "react"
import "@/assets/styles/indexApp.scss"
import "./App.scss"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { Provider, useSelector } from "react-redux"
import store from "@/store/index"
import { selectIsAuthenticated } from "@/store/profileSlice"
import { selectSuccessItems, selectErrorItems } from "@/store/alertSlice"

import Default from "@/layouts/Default"
import Auth from "@/pages/Auth_Login/Index"
import Main from "@/pages/Main_Index/Index"
import AlertManager from "@/ui-components/AlertManager"

const App = () => {
	return (
		<Provider store={store}>
			<WithStore />
		</Provider>
	)
}

const WithStore = () => {
	const successItems = useSelector(selectSuccessItems)
	const errorItems = useSelector(selectErrorItems)

	return (
		<React.Fragment>
			<AlertManager className="alert-manager" successItems={successItems} errorItems={errorItems} />

			<BrowserRouter>
				<Protected />
			</BrowserRouter>
		</React.Fragment>
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
