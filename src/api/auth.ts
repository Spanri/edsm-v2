export function login({ email, password }: { email: string; password: string }) {
	try {
		if (email != "email") {
			throw new Error("Неправильный логин или пароль")
		}
	} catch (errors) {
		throw errors
	}
}
