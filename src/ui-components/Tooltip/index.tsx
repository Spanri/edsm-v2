import React, { useState } from "react"
import PropTypes from "prop-types"
import "./styles.scss"

const THEMES = ["common"] as const
const EVENTS = ["hover"] as const

interface propsType {
	children: any
	content: any
	className?: string
	theme?: typeof THEMES[number]
	events?: typeof EVENTS[number]
}

const Tooltip = (props: propsType) => {
	const [isShow, setIsShow] = useState(false)

	const onMouseEnter = (event: any) => {
		if (EVENTS.includes("hover")) {
			setIsShow(true)
		}
	}

	const onMouseLeave = (event: any) => {
		if (EVENTS.includes("hover")) {
			setIsShow(false)
		}
	}

	return (
		<div className="ui-tooltip-wrapper">
			<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				{props.children}
			</div>

			{isShow && <div className={`ui-tooltip ${props.theme} ${props.className}`}>{props.content}</div>}
		</div>
	)
}

Tooltip.defaultProps = {
	theme: "common",
	events: EVENTS
}

Tooltip.propTypes = {
	children: PropTypes.node.isRequired,
	content: PropTypes.node.isRequired,
	className: PropTypes.string,
	theme: PropTypes.oneOf(THEMES),
	events: PropTypes.arrayOf(PropTypes.oneOf(EVENTS))
}

export default Tooltip
