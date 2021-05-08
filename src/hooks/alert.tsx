import React from "react"
import { useDispatch } from "react-redux"
import { addSuccess, addError, deleteAlert, clearSuccesses, clearErrors, clearAll } from "@/store/alertSlice"

const useAlert = () => {
	const dispatch = useDispatch()

	return {
		addSuccess: (event: any) => dispatch(addSuccess(event)),
		addError: (event: any) => dispatch(addError(event)),
		deleteAlert: (event: any) => dispatch(deleteAlert(event)),
		clearSuccesses: () => dispatch(clearSuccesses()),
		clearErrors: () => dispatch(clearErrors()),
		clearAll: () => dispatch(clearAll())
	}
}

export default useAlert
