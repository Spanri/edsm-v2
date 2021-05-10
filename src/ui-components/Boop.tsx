import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

/**
 * !!!
 * https://www.joshwcomeau.com/react/boop/
 */

interface propsType {
	children: any
	className?: string
	rotation?: number
	timing?: number
}

const Boop = (props: propsType) => {
	const [isBooped, setIsBooped] = useState(false)

	const style: any = {
		display: "inline-block",
		backfaceVisibility: "hidden",
		transform: isBooped ? `rotate(${props.rotation}deg)` : `rotate(0deg)`,
		transition: `transform ${props.timing}ms`
	}

	useEffect(() => {
		if (!isBooped) return

		const timeoutId = setTimeout(() => {
			setIsBooped(false)
		}, props.timing)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [isBooped, props.timing])

	const trigger = () => {
		setIsBooped(true)
	}

	return (
		<span className={props.className} onMouseEnter={trigger} style={style}>
			{props.children}
		</span>
	)
}

Boop.defaultProps = {
	rotation: 30,
	timing: 250
}

Boop.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	rotation: PropTypes.number,
	timing: PropTypes.number
}

export default Boop
