import React from "react";


import "components/Application.scss";
import useApplicationData from 'hooks/useApplicationData'
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
	const {
		state,
		setDay,
		bookInterview,
		cancelInterview
	} = useApplicationData();

	const interviewers = getInterviewersForDay(state, state.day);

	const appts = getAppointmentsForDay(state, state.day).map((appt) => {
		return (
			<Appointment
				key={appt.id}
				id={appt.id}
				time={appt.time}
				interview={getInterview(state, appt.interview)}
				interviewers={interviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
			/>
		);
	});

	return (
		<main className="layout">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList days={state.days} day={state.day} setDay={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{appts}
				<Appointment key="last" time="8PM" />
			</section>
		</main>
	);
}
