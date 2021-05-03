/**
 * localStorage for persistantState (redux)
 */

const STATE_NAME = "persistantState"

export const getCurrentState = () => {
	const serialisedState = localStorage.getItem(STATE_NAME)
	if (serialisedState === null) return {}

	return JSON.parse(serialisedState)
}

/**
 *
 * @param {string} key example - "profile.user.name"
 * @param {any} value
 */
export const setLsItem = (key: string, value: any) => {
	const currentState = getCurrentState()
	const props = key.split(".").reverse()

	let child = value
	for (const prop of props) {
		child = { [prop]: child }
	}

	const newState = { ...currentState, ...child }
	localStorage.setItem(STATE_NAME, JSON.stringify(newState))
}
