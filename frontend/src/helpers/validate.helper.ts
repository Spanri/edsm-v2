interface validateType {
	(value: any): string | null
}

interface receivedParamsType {
	message?: string
	events?: string[]
}

export interface paramsType extends receivedParamsType {
	validate: validateType
}

export const EVENTS = {
	BLUR: "blur",
	CHANGE: "change",
	CHANGE_AFTER_FIRST_BLUR: "changeAfterFirstBlur",
	MUTATE: "mutate"
}

// even if not touched
export const touchFreeEvents = [EVENTS.MUTATE]

/**
 * @param {paramsType} params
 * @returns {paramsType}
 */
export const vEmail = (params?: receivedParamsType) => {
	const defaultMessage = "Неправильный формат"
	const extraParams = { events: [EVENTS.BLUR, EVENTS.CHANGE_AFTER_FIRST_BLUR] }

	const validate = (email: string) => {
		const emailFormat = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
		if (!emailFormat) {
			return params?.message || defaultMessage
		}

		return null
	}

	return { ...extraParams, ...params, validate }
}

/**
 * @param {string} value
 * @param {paramsType} params
 * @returns {paramsType}
 */
export const vRequired = (params?: paramsType) => {
	const defaultMessage = "Обязательно к заполнению"
	const extraParams = { message: defaultMessage }

	const validate = (value: string) => {
		if (!value) {
			return params?.message || defaultMessage
		}

		return null
	}

	return { ...extraParams, ...params, validate }
}

/**
 *@param {string} apiError
 * @param {paramsType} params
 * @returns {paramsType}
 */
export const vApi = (apiError: string, params?: paramsType) => {
	const defaultMessage = "Значение заполнено неправильно"
	// apiError - for good updating of error watcher
	const extraParams = { apiError, message: defaultMessage, events: [EVENTS.MUTATE] }

	const validate = (value: string) => {
		if (!!apiError) {
			return params?.message || defaultMessage
		}

		return null
	}

	return { ...extraParams, ...params, validate }
}
