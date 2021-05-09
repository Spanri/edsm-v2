/**
 * Обработка api ошибок
 *
 * @param {Object} error объект с ошибкой с бекенда
 * @param {String} message сообщение, если ошибки в data нет
 * @returns {
 *   message: string,
 *   fields: { field1: "", field2: "" },
 *   isFormError: boolean,
 *   isFormOtherError: boolean
 * }
 */
export const handleErrors = (error: { message: string; data: any }, message: string = "Ошибка") => {
	// Если в error нет data - возвращаем свою ошибку-затычку
	const hasDataMessage = error && error.data && Object.keys(error.data).length > 0
	if (!hasDataMessage) {
		return { message }
	}

	const data = { ...error.data }
	const SPECIAL_KEYS = ["_code_error", "_alert"]

	// только то, что не специальный ключ
	const normalizedData = { ...error.data }
	for (const key in normalizedData) {
		if (SPECIAL_KEYS.includes(key)) {
			delete normalizedData[key]
		}
	}

	/**
	 * Каждый элемент массива data - массив вида [option, value].
	 * Если value - массив, то пушим в массив ошибок каждый элемент массива value.
	 * Если value - не массив, то скорее всего это просто строка. Пушим ее в массив ошибок.
	 */
	const newMessage = (() => {
		const errors = []

		for (const [key, value] of Object.entries(normalizedData)) {
			if (Array.isArray(value)) {
				value.forEach(valueItem => {
					errors.push(valueItem)
				})
			} else {
				errors.push(value)
			}
		}

		return errors.join("; ")
	})()

	const fields = (() => {
		const normalizedFields = { ...normalizedData }

		for (const [key, value] of Object.entries(normalizedFields)) {
			if (Array.isArray(value)) {
				normalizedFields[key] = value.join("; ")
			} else {
				normalizedFields[key] = value
			}
		}

		return normalizedFields
	})()

	return { message: newMessage, fields: fields }
}
