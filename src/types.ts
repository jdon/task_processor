export type TaskNumber = number | '*';

export type Input = {
	hour: TaskNumber;
	minute: TaskNumber;
	command: string;
};

export enum Day {
	Today = 'today',
	Tomorrow = 'tomorrow',
}
