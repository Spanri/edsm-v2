import React from "react"
import "@/assets/styles/indexApp.scss"
import "./App.scss"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import { Provider, useSelector } from "react-redux"
import store from "@/store/index"
import { selectIsAuthenticated } from "@/store/profileSlice"
import { selectSuccessItems, selectErrorItems } from "@/store/alertSlice"

import DefaultRoute from "@/components-ui/DefaultRoute"

import AuthDefaultLayout from "@/layouts/Auth_Default"
import DefaultLayout from "@/layouts/Default"

import AuthLogin from "@/pages/Auth_Login/Index"
import AuthPasswordReset from "@/pages/Auth_PasswordReset/Index"
import Main from "@/pages/Main/Index"
import SharedFAQ from "@/pages/Shared_FAQ/Index"
import AlertManager from "@/components-ui/AlertManager"

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
				<SharedRouteResolver>
					<ProtectedRouteResolver />
				</SharedRouteResolver>
			</BrowserRouter>
		</React.Fragment>
	)
}

const SharedRouteResolver = (props: any) => {
	return (
		<Switch>
			<DefaultRoute path="/faq">
				<DefaultLayout>
					<SharedFAQ />
				</DefaultLayout>
			</DefaultRoute>

			<Route path="*">{props.children}</Route>
		</Switch>
	)
}

const ProtectedRouteResolver = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	return isAuthenticated ? <MainRouteResolver /> : <AuthRouteResolver />
}

const AuthRouteResolver = () => {
	return (
		<Switch>
			<DefaultRoute path="/login">
				<AuthDefaultLayout>{params => <AuthLogin {...params} />}</AuthDefaultLayout>
			</DefaultRoute>

			<DefaultRoute path="/password-reset">
				<AuthDefaultLayout>{params => <AuthPasswordReset {...params} />}</AuthDefaultLayout>
			</DefaultRoute>

			<Route path="*">
				<Redirect to="/login" />
			</Route>
		</Switch>
	)
}

const MainRouteResolver = () => {
	return (
		<Switch>
			<Route path="/">
				<DefaultLayout>
					<Main />
				</DefaultLayout>
			</Route>
		</Switch>
	)
}

export default App
