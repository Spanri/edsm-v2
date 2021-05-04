import React from "react"
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
	onChange?: (value: any) => void
	onChangeFull?: (value: any) => void
}

const Input = (props: propsType) => {
	const onlyNumber = (event: any) => {
		let keyCode = event.keyCode ? event.keyCode : event.which
		if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
			// 46 is dot
			event.preventDefault()
		}
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

			<input
				className="ui-input__input"
				value={props.value}
				type={props.type}
				placeholder={props.placeholder || (props.label as string) || ""}
				style={{ width: props.width, height: props.height }}
				onKeyPress={event => (props.type === "number" ? onlyNumber(event) : null)}
				onChange={handleChange}
			/>
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
	onChange: PropTypes.func,
	onChangeFull: PropTypes.func
}

export default Input
