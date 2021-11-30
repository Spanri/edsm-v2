/**
 * logic from here:
 * https://stackoverflow.com/questions/55275788/react-native-count-down-timer-in-millisecond
 */

export class CustomTimer {
	private _id: any
	private _started: any
	private _isRunning: boolean = false
	private _callback: any
	private _remaining: number

	constructor(callback: any = () => {}, delay: number) {
		this._callback = callback
		this._remaining = delay

		this.start()
	}

	public start() {
		this._isRunning = true
		this._started = new Date()
		this._id = setTimeout(this._callback, this._remaining)
	}

	public pause() {
		this._isRunning = false
		clearTimeout(this._id)
		this._remaining -= new Date().getTime() - this._started.getTime()
	}

	public clear() {
		this._isRunning = false
		clearTimeout(this._id)
		this._remaining = 0
	}

	public getTimeLeft() {
		if (this._isRunning) {
			this.pause()
			this.start()
		}

		return this._remaining
	}

	public getStateRunning() {
		return this._isRunning
	}
}
