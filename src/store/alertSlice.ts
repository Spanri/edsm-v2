import { createSlice } from "@reduxjs/toolkit"
import _uniqueId from "lodash/uniqueId"

export const alertSlice = createSlice({
	name: "alert",

	initialState: {
		successItems: [],
		errorItems: []
	} as {
		successItems: alertType[]
		errorItems: alertType[]
	},

	reducers: {
		addSuccess: (state, action) => {
			let data = action.payload
			if (typeof action.payload == "string") {
				data = { text: action.payload }
			}

			state.successItems.push({ id: _uniqueId("success-"), ...data })
		},

		addError: (state, action) => {
			let data = action.payload
			if (typeof action.payload == "string") {
				data = { text: action.payload }
			}

			state.errorItems.push({ id: _uniqueId("error-"), ...data })
		},

		/**
		 * Принимает id
		 */
		deleteAlert: (state, action: { payload: number }) => {
			const deletingId = action.payload

			state.successItems = state.successItems.filter(item => item.id != deletingId)
			state.errorItems = state.errorItems.filter(item => item.id != deletingId)
		},

		clearSuccesses: state => {
			state.successItems = []
		},

		clearErrors: state => {
			state.errorItems = []
		},

		clearAll: state => {
			state.successItems = []
			state.errorItems = []
		}
	}
})

export const selectSuccessItems = (state: any) => state.alert.successItems
export const selectErrorItems = (state: any) => state.alert.errorItems

export const { addSuccess, addError, deleteAlert, clearSuccesses, clearErrors, clearAll } = alertSlice.actions
export default alertSlice.reducer
