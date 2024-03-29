import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import "./styles.scss"
import { CustomTimer } from "@/helpers/timer.helper"

import CloseButton from "@/shared/ui/CloseButton/index"

const THEMES = ["info", "success", "error"] as const

interface propsType {
	children: any
	className?: string
	theme: typeof THEMES[number]
	timeout: number
	onDelete?: () => void
}

const Alert = (props: propsType) => {
	const [isShow, setIsShow] = useState(true)
	const [customTimer, setCustomTimer] = useState({ getTimeLeft: () => 0 }) as any
	const [timeLeft, setTimeLeft] = useState(0) as any

	useEffect(() => {
		const customTimer = new CustomTimer((event: any) => onPrettyDelete(), props.timeout)

		setCustomTimer(customTimer)

		const intervalId = setInterval(() => {
			setTimeLeft(customTimer.getTimeLeft())
		}, 10)

		return () => {
			customTimer.clear()
			clearInterval(intervalId)
		}
	}, [])

	// Подождать, потом сделать анимацию удаления и потом вызвать onDelete
	const onPrettyDelete = () => {
		setIsShow(false)

		const ANIMATION_DURATION = 600
		setTimeout(() => {
			if (props.onDelete) {
				props.onDelete()
			}
		}, ANIMATION_DURATION)
	}

	return (
		<div
			className={`ui-alert ${props.theme} ${props.className} ${!isShow ? "hide" : ""}`}
			onMouseEnter={e => customTimer.pause()}
			onMouseLeave={e => customTimer.start()}
		>
			<div className="ui-alert-inner">
				<div className="ui-alert__content">{props.children}</div>

				<CloseButton className="ui-alert__close" onClick={onPrettyDelete} />
			</div>

			<div className="ui-alert__loading" style={{ width: (timeLeft / props.timeout) * 100 + "%" }} />
		</div>
	)
}

Alert.defaultProps = {
	theme: "info",
	timeout: 4000
}

Alert.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	theme: PropTypes.oneOf(THEMES),
	timeout: PropTypes.number,
	onDelete: PropTypes.func
}

export default Alert
