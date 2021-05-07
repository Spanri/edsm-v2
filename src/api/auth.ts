const login = async ({ email, password }: loginDataType) => {
	try {
		if (email != "email") {
			throw new Error("Неправильный Email или Пароль")
		}

		// Login action
	} catch (errors) {
		throw errors
	}
}

const logout = async () => {
	try {
		// Exit action
	} catch (errors) {
		throw errors
	}
}

const resetPassword = async ({ email }: resetPasswordDataType) => {
	try {
		// Exit action
	} catch (errors) {
		throw errors
	}
}

export default { login, logout, resetPassword }
