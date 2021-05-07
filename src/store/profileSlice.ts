import { createSlice } from "@reduxjs/toolkit"
import authApi from "../api/auth"

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

export const login = (data: loginDataType) => async (dispatch: any) => {
	await authApi.login(data)

	dispatch(setUser("userName"))
	dispatch(setIsAuthenticated(true))
}

export const logout = () => async (dispatch: any) => {
	await authApi.logout()

	dispatch(setIsAuthenticated(false))
	dispatch(setUser(null))
}

export const resetPassword = (data: resetPasswordDataType) => async (dispatch: any) => {
	await authApi.resetPassword(data)
}

export const selectIsAuthenticated = (state: any) => state.profile.isAuthenticated
export const selectUser = (state: any) => state.profile.user

export const { setUser, clearUser, setIsAuthenticated } = profileSlice.actions
export default profileSlice.reducer
