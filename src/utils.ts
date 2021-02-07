import Task from './Task';

export const processTasks = (
	tasksToProcess: Task[],
	currentHour: number,
	currentMinute: number
): string[] => {
	return tasksToProcess.map((task) => task.getNext(currentHour, currentMinute));
};
