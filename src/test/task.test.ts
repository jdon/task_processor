import Task from '../Task';
import { processTasks } from '../utils';

test('Processes a daily task', () => {
	const task = Task.new('30 1 /bin/run_me_daily');

	const result = task.getNext(16, 10);

	expect(result).toEqual('1:30 tomorrow - /bin/run_me_daily');
});

test('Processes a hourly task', () => {
	const task = Task.new('45 * /bin/run_me_hourly');

	const result = task.getNext(16, 10);

	expect(result).toEqual('16:45 today - /bin/run_me_hourly');
});

test('Processes an every minute task', () => {
	const task = Task.new('* * /bin/run_me_every_minute');

	const result = task.getNext(16, 10);

	expect(result).toEqual('16:10 today - /bin/run_me_every_minute');
});

test('Processes a sixty times task', () => {
	const task = Task.new('* 19 /bin/run_me_sixty_times');

	const result = task.getNext(16, 10);

	expect(result).toEqual('19:00 today - /bin/run_me_sixty_times');
});

test('Processes a task at midnight', () => {
	const task = Task.new('1 * /bin/run_me_sixty_times');

	const result = task.getNext(23, 10);

	expect(result).toEqual('0:01 tomorrow - /bin/run_me_sixty_times');
});

test('Processes a task at every min', () => {
	const task = Task.new('* 17 /bin/run_me_sixty_times');

	const result = task.getNext(17, 10);

	expect(result).toEqual('17:10 today - /bin/run_me_sixty_times');
});

test('Processes a task with a space', () => {
	const task = Task.new('1 * /bin/run_me_sixty_ times');

	const result = task.getNext(23, 10);

	expect(result).toEqual('0:01 tomorrow - /bin/run_me_sixty_ times');
});

test('Processes a task with the same time', () => {
	const task = Task.new('11 11 /bin/testTask');

	const result = task.getNext(11, 11);

	expect(result).toEqual('11:11 today - /bin/testTask');
});

test('Processes a task with hour above current hour and every min', () => {
	const task = Task.new('* 11 /bin/testTask');

	const result = task.getNext(12, 11);

	expect(result).toEqual('11:00 tomorrow - /bin/testTask');
});

test('Processes a task with current hour and minute less than current', () => {
	const task = Task.new('10 12 /bin/testTask');

	const result = task.getNext(12, 11);

	expect(result).toEqual('13:10 today - /bin/testTask');
});

test('Processes a task with greater than current hour', () => {
	const task = Task.new('10 11 /bin/testTask');

	const result = task.getNext(9, 11);

	expect(result).toEqual('11:10 today - /bin/testTask');
});

test('Processes a task with less than current hour', () => {
	const task = Task.new('10 11 /bin/testTask');

	const result = task.getNext(11, 11);

	expect(result).toEqual('12:10 today - /bin/testTask');
});

test('Processes tasks in correct order', () => {
	const tasks: Task[] = [];
	tasks.push(Task.new('30 1 /bin/run_me_daily'));
	tasks.push(Task.new('45 * /bin/run_me_hourly'));
	tasks.push(Task.new('* * /bin/run_me_every_minute'));

	const processedTasks = processTasks(tasks, 16, 10);

	expect(processedTasks[0]).toEqual('1:30 tomorrow - /bin/run_me_daily');
	expect(processedTasks[1]).toEqual('16:45 today - /bin/run_me_hourly');
	expect(processedTasks[2]).toEqual('16:10 today - /bin/run_me_every_minute');
});

test('Errors when given invalid input', () => {
	expect(() => Task.new('Invalid String')).toThrow(
		"Invalid input. Input should be 'minute hour command'"
	);
});

test('Errors when given invalid hour', () => {
	expect(() => Task.new('25 27 command')).toThrow(
		'Invalid hour. Hour must be more than zero and less than 24'
	);
});

test('Errors when given invalid minute', () => {
	expect(() => Task.new('61 1 command')).toThrow(
		'Invalid minute. Minute must be more than zero and less than 60'
	);
});

test('Errors when given invalid string minute', () => {
	expect(() => Task.new('fdasda 1 command')).toThrow('Failed to parse fdasda');
});

test('Errors when given invalid string hour', () => {
	expect(() => Task.new('12 dsd command')).toThrow('Failed to parse dsd');
});

test('Errors when given empty string', () => {
	expect(() => Task.new('')).toThrow(
		"Invalid input. Input should be 'minute hour command'"
	);
});
