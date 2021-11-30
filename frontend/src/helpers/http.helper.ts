import axios from "axios"
import { handleErrors } from "@/helpers/error.helper"

const BASE_URL = "https://reqres.in/api"

const handleSuccessRequest = async (config: any) => config

const handleErrorRequest = (errorResponse: any) => Promise.reject(errorResponse)

const handleSuccessResponse = (successResponse: any) => successResponse.data

const temporaryHandler = (errorResponse: any) => {
	const response = errorResponse.response
	const fields = JSON.parse(response.config.data)
	Object.keys(fields).forEach((fieldKey: string) => {
		const field = fields[fieldKey]

		if (!field || field == "") {
			fields[fieldKey] = "Не заполнено"
		} else {
			fields[fieldKey] = null
		}
	})

	return Promise.reject({ message: response.data.error, fields: fields })
}

const handleErrorResponse = (errorResponse: any) => {
	if (!errorResponse.response) {
		return Promise.reject({ message: "Внутренняя ошибка", fields: {} })
	}

	// return Promise.reject(handleErrors(errorResponse.response.data))
	return temporaryHandler(errorResponse)
}

const http = axios.create({
	baseURL: BASE_URL,
	// 'Authorization': `Bearer ${keys.access_token}`,
	Accept: "application/json",
	"Content-Type": "application/x-www-form-urlencoded"
} as any)

http.interceptors.request.use(handleSuccessRequest, handleErrorRequest)
http.interceptors.response.use(handleSuccessResponse, handleErrorResponse)

export { http }
