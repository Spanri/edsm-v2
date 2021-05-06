import React from "react"
import PropTypes from "prop-types"
import "./styles.scss"

const THEMES = ["info", "success", "error"] as const

interface propsType {
	children: any
	className?: string
	theme?: typeof THEMES[number]
	timeout?: number
	onDelete?: () => void
}

const Alert = (props: propsType) => {
	setTimeout((event: any) => {
		if (props.onDelete) {
			props.onDelete()
		}
	}, props.timeout)

	return <div className={`ui-alert ${props.theme} ${props.className}`}>{props.children}</div>
}

Alert.defaultProps = {
	theme: "info",
	timeout: 3000
}

Alert.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	className: PropTypes.string,
	theme: PropTypes.oneOf(THEMES),
	timeout: PropTypes.number,
	onDelete: PropTypes.func
}

export default Alert
