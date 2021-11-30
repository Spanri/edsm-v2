import { http } from "@/helpers/http.helper"

const login = async (data: loginDataType) => {
	const response = await http.post("login", data, { headers: { "X-FakeAPI-Action": "register" } })
	return response
}

const logout = async () => {
	// Exit action
}

const resetPassword = async ({ email }: resetPasswordDataType) => {
	// Exit action
}

export default { login, logout, resetPassword }
