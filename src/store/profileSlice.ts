import { createSlice } from "@reduxjs/toolkit"
import authApi from "@/api/auth"

interface userType {
	name: string
}

interface stateType {
	user: userType | null
	isAuthenticated: boolean
	token: string | null
}

interface setUserType {
	user: userType | null
	token: string | null
}

export const profileSlice = createSlice({
	name: "profile",

	initialState: {
		isAuthenticated: false,
		user: null,
		token: null
	} as stateType,

	reducers: {
		setUser: (state, action: { payload: any }) => {
			if (!action.payload) {
				state.user = null
				state.token = null
			} else {
				state.user = action.payload.user
				state.token = action.payload.token
			}
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
export const selectToken = (state: any) => state.profile.token

export const { setUser, clearUser, setIsAuthenticated } = profileSlice.actions
export default profileSlice.reducer
