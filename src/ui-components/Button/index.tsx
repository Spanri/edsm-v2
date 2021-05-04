import React from "react"
import PropTypes from "prop-types"
import "./styles.scss"

const TYPES = ["button", "submit", "reset"] as const
const THEMES = ["primary", "primary-animated", "gray"] as const

interface propsType {
	children: any
	className?: string
	type?: typeof TYPES[number]
	theme?: typeof THEMES[number]
	disabled?: boolean
	width?: string
	height?: string
	onClick?: (event: any) => void
}

const Button = (props: propsType) => {
	const handleClick = (event: any) => {
		if (props.onClick) {
			props.onClick(event)
		}
	}

	return (
		<button
			className={`ui-button ${props.theme} ${props.className}`}
			type={props.type || "button"}
			disabled={props.disabled}
			style={{ width: props.width, height: props.height }}
			onClick={handleClick}
		>
			{props.children}
		</button>
	)
}

Button.defaultProps = {
	type: "button",
	theme: "primary",
	width: "200px",
	height: "40px"
}

Button.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	className: PropTypes.string,
	type: PropTypes.oneOf(TYPES),
	theme: PropTypes.oneOf(THEMES),
	disabled: PropTypes.bool,
	width: PropTypes.string,
	height: PropTypes.string,
	onClick: PropTypes.func
}

export default Button
