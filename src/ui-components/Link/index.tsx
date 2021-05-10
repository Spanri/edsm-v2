import React from "react"
import PropTypes from "prop-types"
import "./styles.scss"

const THEMES = ["common"] as const

interface propsType {
	children: any
	className?: string
	target?: string
	theme?: typeof THEMES[number]
	// to or onClick
	to?: { pathname: string }
	onClick?: (event: any) => void
}

const Link = (props: propsType) => {
	const handleClick = (event: any) => {
		if (props.onClick) {
			props.onClick(event.target.value)

			return true
		}
	}

	return (
		<div className={`ui-link ${props.theme} ${props.className}`}>
			<a href={props.to ? props.to.pathname : ""} onClick={handleClick}>
				{props.children}
			</a>
		</div>
	)
}

Link.defaultProps = {
	target: "_self",
	theme: "common"
}

Link.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	target: PropTypes.string,
	theme: PropTypes.oneOf(THEMES),

	to: PropTypes.object,
	onClick: PropTypes.func
}

export default Link
