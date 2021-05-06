import React, { useEffect, useState } from "react"
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
	const [isShow, setIsShow] = useState(true)

	useEffect(() => {
		// Подождать, потом сделать анимацию удаления и потом вызвать onDelete
		const timeoutId = setTimeout((event: any) => {
			setIsShow(false)

			const ANIMATION_DURATION = 600
			setTimeout(() => {
				if (props.onDelete) {
					props.onDelete()
				}
			}, ANIMATION_DURATION)
		}, props.timeout)

		return () => {
			clearTimeout(timeoutId)
			setIsShow(false)
		}
	}, [])

	return <div className={`ui-alert ${props.theme} ${props.className} ${!isShow && "hide"}`}>{props.children}</div>
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
