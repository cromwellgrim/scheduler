# Interview Scheduler

This app allows the user to schedule an interview between a student (by inputting a student name) and an interviewer (by choosing from available interviewers) and saves the appointment to a database. 
The user can choose between days of the week to view, edit, cancel, or add to the interviews scheduled. The days have indicator of how many spots are available and this counter tracks when an interview is created or deleted and will update itself.

## Setup

Install dependencies with `npm install` or `yarn install`.

## Running Webpack Development Server

```sh
npm start or yarn start
```

## Running Jest Test Framework

```sh
npm test or yarn test
```

## Running Storybook Visual Testbed

```sh
npm run storybook or yarn storybook
```
## Screenshots
!["Day Selection"](https://github.com/cromwellgrim/scheduler/blob/master/docs/scheduler-day-select.png)
!["Add an Interview"](https://github.com/cromwellgrim/scheduler/blob/master/docs/scheduler-add-interview.png)
!["Makes sure interview information is all loaded before saving to database"](https://github.com/cromwellgrim/scheduler/blob/master/docs/scheduler-input-errors.png)
!["Hover over reveals edit/delete buttons"](https://github.com/cromwellgrim/scheduler/blob/master/docs/scheduler-hover-options.png)
!["Prompt asks you to confirm cancelling"](https://github.com/cromwellgrim/scheduler/blob/master/docs/scheduler-delete-prompt.png)
