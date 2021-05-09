import { http } from "@/helpers/http.helper"

const login = async (data: loginDataType) => {
	return await http.post("login", data, { headers: { "X-FakeAPI-Action": "register" } })
}

const logout = async () => {
	// Exit action
}

const resetPassword = async ({ email }: resetPasswordDataType) => {
	// Exit action
}

export default { login, logout, resetPassword }
