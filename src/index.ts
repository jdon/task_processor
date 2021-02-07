import readline from 'readline';
import Task from './Task';
import { processTasks } from './utils';

const [, , inputtedTime] = process.argv;
const [inputtedHour, inputtedMinute] = inputtedTime.split(':');

const hour = Number.parseInt(inputtedHour, 10);
const minute = Number.parseInt(inputtedMinute, 10);

if (Number.isNaN(hour) || Number.isNaN(minute)) {
	throw new Error('Inputted hour and minutes are invalid');
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false,
});

const tasks: Task[] = [];

rl.on('line', function (line) {
	const task = Task.new(line);
	tasks.push(task);
});

rl.on('close', () => {
	processTasks(tasks, hour, minute).forEach((task) => console.log(task));
});
