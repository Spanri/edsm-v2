import { createSlice } from "@reduxjs/toolkit"

interface loginDataType {
	email: string
	password: string
}

const fakeAuth = {
	login(data: loginDataType, cb: any) {
		setTimeout(cb, 100)
	},

	logout(cb: any) {
		setTimeout(cb, 100)
	}
}

export const profileSlice = createSlice({
	name: "profile",

	initialState: {
		isAuthenticated: false,
		user: null
	} as {
		user: string | null
		isAuthenticated: boolean
	},

	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},

		clearUser: state => {
			state.user = null
		},

		setIsAuthenticated: (state, action) => {
			state.isAuthenticated = action.payload
		}
	}
})

export const login = (data: loginDataType, cb?: any) => (dispatch: any) => {
	fakeAuth.login(data, () => {
		dispatch(setUser("userName"))
		dispatch(setIsAuthenticated(true))

		if (cb) {
			cb()
		}
	})
}

export const logout = (cb?: any) => (dispatch: any) => {
	fakeAuth.logout(() => {
		dispatch(setIsAuthenticated(false))
		dispatch(setUser(null))

		if (cb) {
			cb()
		}
	})
}

export const selectIsAuthenticated = (state: any) => state.profile.isAuthenticated
export const selectUser = (state: any) => state.profile.user

export const { setUser, clearUser, setIsAuthenticated } = profileSlice.actions
export default profileSlice.reducer
