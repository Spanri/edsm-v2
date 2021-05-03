import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "./profileSlice"

// things that need to be saved
const savingState = (state: any) => {
	return {
		profile: {
			user: state.profile.user,
			isAuthenticated: state.profile.isAuthenticated
		}
	}
}

// convert object to string and store in localStorage
const saveToLocalStorage = (state: any) => {
	try {
		const serialisedState = JSON.stringify(savingState(state))
		localStorage.setItem("persistantState", serialisedState)
	} catch (errors) {
		console.warn(errors)
	}
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
const loadFromLocalStorage = () => {
	try {
		const serialisedState = localStorage.getItem("persistantState")
		if (serialisedState === null) return undefined
		return JSON.parse(serialisedState)
	} catch (errors) {
		console.warn(errors)
		return undefined
	}
}

const store = configureStore({
	reducer: {
		profile: profileReducer
	},
	preloadedState: loadFromLocalStorage()
})

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
