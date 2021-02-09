# A task processor
Built using node 14.

Before running anything, you will need to install the dependencies, this can be done using:
```
npm ci
```

To run with test data:
```
npm run start
```

To run with custom data:
```
npm run build && node ./dist/index.js HH:MM < config
```

To run tests:
```
npm run test
```

To run tests with coverage run:
```
npm run test -- --coverage
```

## Further improvements
1) Testing of reading from stdin and command line arguments. Due to time constraints, I decided it would be easier to manually test.
2) Error handling wasn't mentioned in the specification, so I just have it throw an error. Would probably change it to run the valid tasks and then print out errors for the tasks it couldn't run.
3) If further expanding then I would switch to a command line package like commander or oclif, rather than manually parse the command line arguments.

## Specification
We have a set of tasks, each running at least daily, which are scheduled using some simple
values in a text file. You might recognise this if you have written a crontab configuration in the
past.

Examples of the the scheduler config:
```
30 1 /bin/run_me_daily
45 * /bin/run_me_hourly
* * /bin/run_me_every_minute
* 19 /bin/run_me_sixty_times
```

The first field is the minute past the hour, the second field is the hour of the day and the third is
the command to run. For both cases `*` means that it should run for all values of that field. In the
above example, run_me_daily has been set to run at 1:30 am every day and run_me_hourly at
45 minutes past the hour every hour. The fields are whitespace-separated and each entry is on
a separate line.

We want you to write a command-line program that takes a single argument. This argument is
the simulated 'current time' in the format HH:MM. The program should accept config lines in the
form above to STDIN and output the soonest time at which each of the commands will fire and
whether it is today or tomorrow. In the case when the task should fire at the simulated 'current
time' then that is the time you should output, not the next one.

For example given the above examples as input and the simulated 'current time' command-line
argument 16:10 the output should be:
```
1:30 tomorrow - /bin/run_me_daily
16:45 today - /bin/run_me_hourly
16:10 today - /bin/run_me_every_minute
19:00 today - /bin/run_me_sixty_times
```