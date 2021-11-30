import { createSlice } from "@reduxjs/toolkit"
import authApi from "@/api/auth"

interface userType {
	name: string
}

interface stateType {
	user: userType | null
	isAuthenticated: boolean
}

interface setUserType {
	user: userType | null
}

export const profileSlice = createSlice({
	name: "profile",

	initialState: {
		isAuthenticated: false,
		user: null
	} as stateType,

	reducers: {
		setUser: (state, action: { payload: any }) => {
			state.user = action.payload || null
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
	const response = await authApi.login(data)

	dispatch(setUser(response))
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
