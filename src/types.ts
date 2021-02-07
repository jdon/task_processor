export type TaskNumber = number | '*';

export type Input = {
	hour: TaskNumber;
	minute: TaskNumber;
	command: string;
};

export enum Day {
	today = 'today',
	tomorrow = 'tomorrow',
}
