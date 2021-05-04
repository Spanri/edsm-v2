import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "./profileSlice"
import { loadFromLocalStorage, saveToLocalStorage } from "../helpers/lsState.helper"

// things that need to be saved
const savingState = (state: any) => {
	return {
		profile: {
			user: state.profile.user,
			isAuthenticated: state.profile.isAuthenticated
		}
	}
}

const store = configureStore({
	reducer: {
		profile: profileReducer
	},
	preloadedState: loadFromLocalStorage()
})

store.subscribe(() => saveToLocalStorage(store.getState(), savingState))

export default store
