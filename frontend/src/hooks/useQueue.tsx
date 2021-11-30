import React, { useState, useEffect } from "react"
import { usePrevious } from "@/hooks"

const useQueue = ({ onHandle }: { onHandle: (params: any) => void }) => {
	const [queue, setQueue]: [any, any] = useState([])
	const [isHandling, setIsHandling] = useState(false)

	const addToQueue = async (params: any) => {
		await setQueue((oldQueue: any) => [...oldQueue, params])
	}

	const popFromQueue = async () => {
		await setQueue((oldQueue: any) => oldQueue.slice(1))
	}

	const handle = async (params: any) => {
		setIsHandling(true)
		await onHandle(params)
		setIsHandling(false)
	}

	const prevQueue = usePrevious(queue)
	useEffect(() => {
		if (prevQueue) {
			// add
			if (queue.length > prevQueue.length) {
				if (!isHandling) {
					handle(queue[0])
				}
			}
			// pop
			else if (queue.length < prevQueue.length) {
				const isEmpty = !queue.length
				if (!isEmpty) {
					handle(queue[0])
				}
			}
		}
	}, [queue])

	return {
		addToQueue,
		popFromQueue,
		queue
	}
}

export default useQueue
