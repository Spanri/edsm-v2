// import { useHistory } from "react-router-dom"

/**
 * localStorage for persistantState (redux)
 */

export const STATE_NAME = "persistantState"

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

export const saveToLocalStorage = (state: any, savingState?: (state: any) => any) => {
	try {
		const serialisedState = JSON.stringify(savingState ? savingState(state) : state)
		localStorage.setItem(STATE_NAME, serialisedState)
	} catch (errors) {
		console.warn(errors)
	}
}

export const loadFromLocalStorage = () => {
	try {
		const serialisedState = localStorage.getItem(STATE_NAME)
		if (serialisedState === null) return undefined

		return JSON.parse(serialisedState)
	} catch (errors) {
		console.warn(errors)
		return undefined
	}
}
