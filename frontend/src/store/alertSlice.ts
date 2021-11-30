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
		deleteAlert: (state, action: { payload: string }) => {
			const deletingId = action.payload

			const newSuccessItems = state.successItems.filter(item => item.id != deletingId)
			if (newSuccessItems.length != state.successItems.length) {
				state.successItems = newSuccessItems
			}

			const newErrorItems = state.errorItems.filter(item => item.id != deletingId)
			if (newSuccessItems.length != state.errorItems.length) {
				state.errorItems = newErrorItems
			}
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
