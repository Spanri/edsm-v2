import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import _ from "lodash"
import "./styles.scss"

import { usePrevious, useQueue } from "@/hooks"
import { paramsType, EVENTS, touchFreeEvents } from "@/helpers/validate.helper"

interface propsType {
	value: string | number
	className?: string
	placeholder?: string
	type?: string
	validate?: paramsType[]
	disabled?: boolean
	label?: any
	width?: string
	height?: string
	right: any
	onChange?: (value: any) => void
	onChangeFull?: (value: any) => void
}

const Input = (props: propsType) => {
	// 1 error for 1 validateRule (errors.length = validate.length)
	const [errors, setErrors]: [any[], any] = useState([])

	const onErrorHandle = (params: { value: any; eventName: string }) => {
		handleErrors(params.value, params.eventName)
	}
	const { addToQueue: addErrorToQueue, popFromQueue: popErrorFromQueue, queue } = useQueue({ onHandle: onErrorHandle })

	const showingError = (() => {
		const normalizedErrors = errors.filter(error => !!error)
		if (normalizedErrors.length) {
			return normalizedErrors[0]
		} else {
			return null
		}
	})()

	const [touched, setTouched] = useState(false)
	const [isFirstBlurAfterTouched, setIsFirstBlurAfterTouched] = useState(false)
	const [isFocus, setIsFocus] = useState(false)

	const normalizeRules = (rules: any) => {
		if (!rules) return null

		const filteredRules = rules.filter((ruleItem: any) => ruleItem.events?.includes(EVENTS.MUTATE))
		return JSON.parse(JSON.stringify(filteredRules))
	}

	const prevValidate = usePrevious(props.validate)
	useEffect(() => {
		const oldMutateRules = normalizeRules(prevValidate)
		const newMutateRules = normalizeRules(props.validate)

		if (oldMutateRules && !_.isEqual(oldMutateRules, newMutateRules)) {
			addErrorToQueue({ value: props.value, eventName: EVENTS.MUTATE })
		}
	}, [props.validate])

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

		if (touched && !isFirstBlurAfterTouched) {
			setIsFirstBlurAfterTouched(true)
		}

		addErrorToQueue({ value: event.target.value, eventName: EVENTS.BLUR })
	}

	const handleChange = (event: { target: { value: any } }) => {
		if (props.onChange) {
			props.onChange(event.target.value)
		}

		if (props.onChangeFull) {
			props.onChangeFull(event)
		}

		if (!touched) {
			setTouched(true)
		}

		addErrorToQueue({ value: event.target.value, eventName: EVENTS.CHANGE })

		if (touched && isFirstBlurAfterTouched) {
			addErrorToQueue({ value: event.target.value, eventName: EVENTS.CHANGE_AFTER_FIRST_BLUR })
		}
	}

	const handleErrors = (value: any, eventName: string) => {
		if (!props.validate) return

		const newErrors: any[] = []

		for (let i = 0; i < props.validate.length; i++) {
			const validateItem = props.validate[i]

			const isEvent = (() => {
				const defaultEvents = [EVENTS.BLUR, EVENTS.CHANGE]
				const events = validateItem.events || defaultEvents
				const isEvent = events?.includes(eventName)
				const isTouched = touched || touchFreeEvents.includes(eventName)

				return isEvent && isTouched
			})()

			const updatedError = (() => {
				if (!isEvent) {
					return errors[i]
				}

				const message = validateItem.validate(value)
				return message
			})()

			newErrors.push(updatedError || undefined)
		}

		setErrors(() => newErrors)
		popErrorFromQueue()
	}

	return (
		<div className={`ui-input ${props.className}`}>
			{props.label && <div className="ui-input__label">{props.label}</div>}

			<div className={`ui-input__content ${isFocus && "focus"} ${!!showingError && "error"}`}>
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

			{showingError && <div className="ui-input__error-message">{showingError}</div>}
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
	validate: PropTypes.array,
	disabled: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	width: PropTypes.string,
	height: PropTypes.string,
	right: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	onChange: PropTypes.func,
	onChangeFull: PropTypes.func
}

export default Input
