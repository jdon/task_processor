import Task from './Task';
import { TaskNumber } from './types';

export const processTasks = (
	tasksToProcess: Task[],
	currentHour: number,
	currentMinute: number
): string[] => {
	return tasksToProcess.map((task) => task.getNext(currentHour, currentMinute));
};

export const parseNumber = (num: string): TaskNumber => {
	if (num === '*') {
		return '*';
	}
	const potentialNumber = parseInt(num, 10);
	if (Number.isInteger(potentialNumber)) {
		return potentialNumber;
	}
	throw new Error(`Failed to parse ${num}`);
};
