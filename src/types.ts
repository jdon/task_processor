export type TaskNumber = number | '*';

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

export type Input = {
	hour: TaskNumber;
	minute: TaskNumber;
	command: string;
};

export enum Day {
	today = 'today',
	tomorrow = 'tomorrow',
}
