export function login(email: string) {
	try {
		if (email != "email") {
			throw new Error("Неправильный логин или пароль")
		}
	} catch (errors) {
		throw errors
	}
}
