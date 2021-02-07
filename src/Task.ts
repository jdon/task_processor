import { Day, parseNumber, TaskNumber } from './types';

export default class Task {
	hour: TaskNumber;
	minute: TaskNumber;
	command: string;

	private validateMinute(minute: TaskNumber): TaskNumber {
		if (minute < 0 || minute > 59) {
			throw new Error(
				'Invalid minute. Minute must be more than zero and less than 60'
			);
		}
		return minute;
	}

	private validateHour(hour: TaskNumber): TaskNumber {
		if (hour < 0 || hour > 23) {
			throw new Error(
				'Invalid hour. Hour must be more than zero and less than 24'
			);
		}
		return hour;
	}

	constructor(hour: TaskNumber, minute: TaskNumber, command: string) {
		this.hour = this.validateHour(hour);
		this.minute = this.validateMinute(minute);
		this.command = command;
	}

	static new(line: string): Task {
		const SPLIT_CHAR = ' ';

		const lines = line.split(SPLIT_CHAR);
		if (lines.length >= 3) {
			const minuteInput = lines.shift();
			const hourInput = lines.shift();
			const commandInput = lines.join(SPLIT_CHAR);

			if (hourInput && minuteInput && commandInput) {
				const hour = parseNumber(hourInput);
				const minute = parseNumber(minuteInput);
				const command = commandInput;
				return new Task(hour, minute, command);
			}
		}
		throw new Error("Invalid input. Input should be 'minute hour command'");
	}

	private generateOutput(
		hour: TaskNumber,
		minute: TaskNumber,
		day: Day,
		command: string
	): string {
		let formattedMinute = `${minute}`;
		if (hour >= 24) {
			hour = 0;
			day = Day.tomorrow;
		}
		if (minute < 10) {
			if (minute === 0) {
				formattedMinute = `00`;
			} else {
				formattedMinute = `0${minute}`;
			}
		}

		return `${hour}:${formattedMinute} ${day} - ${command}`;
	}

	getNext(currentHour: number, currentMinute: number): string {
		if (
			(this.hour === currentHour && this.minute === currentMinute) ||
			(this.hour === '*' && this.minute === '*') ||
			(this.hour === currentHour && this.minute === '*') ||
			(this.hour === '*' && this.minute === currentMinute)
		) {
			return this.generateOutput(
				currentHour,
				currentMinute,
				Day.today,
				this.command
			);
		}

		if (this.minute === '*') {
			if (currentHour > this.hour) {
				return this.generateOutput(this.hour, 0, Day.tomorrow, this.command);
			}
			return this.generateOutput(this.hour, 0, Day.today, this.command);
		}

		if (this.hour === '*' || currentHour === this.hour) {
			if (currentMinute <= this.minute) {
				return this.generateOutput(
					currentHour,
					this.minute,
					Day.today,
					this.command
				);
			}
			return this.generateOutput(
				currentHour + 1,
				this.minute,
				Day.today,
				this.command
			);
		} else {
			if (currentHour < this.hour) {
				return this.generateOutput(
					this.hour,
					this.minute,
					Day.today,
					this.command
				);
			}
			return this.generateOutput(
				this.hour,
				this.minute,
				Day.tomorrow,
				this.command
			);
		}
	}
}
