import React, { useState } from "react"
import PropTypes from "prop-types"
import "./styles.scss"

interface propsType {
	value: string | number
	className?: string
	placeholder?: string
	type?: string
	disabled?: boolean
	label?: any
	width?: string
	height?: string
	right: any
	onChange?: (value: any) => void
	onChangeFull?: (value: any) => void
}

const Input = (props: propsType) => {
	const [isFocus, setIsFocus] = useState(false)

	const onlyNumber = (event: any) => {
		let keyCode = event.keyCode ? event.keyCode : event.which
		if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
			// 46 is dot
			event.preventDefault()
		}
	}

	const handleKeyPress = (event: any) => {
		if (props.type === "number") {
			onlyNumber(event)
		}
	}

	const handleFocus = (event: any) => {
		setIsFocus(true)
	}

	const handleBlur = (event: any) => {
		setIsFocus(false)
	}

	const handleChange = (event: any) => {
		if (props.onChange) {
			props.onChange(event.target.value)
		}

		if (props.onChangeFull) {
			props.onChangeFull(event)
		}
	}

	return (
		<div className={`ui-input ${props.className}`}>
			{props.label && <div className="ui-input__label">{props.label}</div>}

			<div className={`ui-input__content ${isFocus && "focus"}`}>
				<input
					className="ui-input__input"
					value={props.value}
					type={props.type}
					placeholder={props.placeholder || (props.label as string) || ""}
					style={{ width: props.width, height: props.height }}
					onKeyPress={handleKeyPress}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
				{props.right && <div className="ui-input__right">{props.right}</div>}
			</div>
		</div>
	)
}

Input.defaultProps = {
	type: "text",
	width: "200px",
	height: "40px"
}

Input.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	width: PropTypes.string,
	height: PropTypes.string,
	right: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	onChange: PropTypes.func,
	onChangeFull: PropTypes.func
}

export default Input
