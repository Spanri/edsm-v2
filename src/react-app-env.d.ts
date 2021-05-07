/// <reference types="react-scripts" />

interface authType {
	user: any
	login: () => void
	logout: () => void
}

interface loginDataType {
	email: string
	password: string
}

interface resetPasswordDataType {
	email: string
}

interface alertType {
	id: string
	text: string
	timeout: number
}
