import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import PropTypes from "prop-types"

interface propsType {
	children: any
	path: string
	routes?: any
}

const DefaultRoute = (props: propsType) => {
	return (
		<Switch>
			<Route exact path={props.path}>
				{props.children}
			</Route>

			{props.routes}

			<Route exact path={props.path + "/*"}>
				<Redirect to={props.path} />
			</Route>
		</Switch>
	)
}

DefaultRoute.propTypes = {
	children: PropTypes.node.isRequired,
	path: PropTypes.string.isRequired,
	routes: PropTypes.node
}

export default DefaultRoute
