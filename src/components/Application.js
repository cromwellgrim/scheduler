import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
// import useApplicationData from 'components/hooks/useApplicationData'
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
	// const {
	// 	state,
	// 	setDay,
	// 	bookInterview,
	// 	cancelInterview
	// } = useApplicationData();

	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const interviewers = getInterviewersForDay(state, state.day);

	const setDay = (day) => setState({ ...state, day });

	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios
			.put(`/api/appointments/${id}`, { interview })
			.then(() => setState({ ...state, appointments }))

	}

	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};

		return axios
			.delete(`/api/appointments/${id}`)
			.then(() => setState({ ...state, appointment }))

	}

	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		]).then((all) => {
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	const appts = dailyAppointments.map((appt) => {
		const interview = getInterview(state, appt.interview);

		return (
			<Appointment
				key={appt.id}
				id={appt.id}
				time={appt.time}
				interview={interview}
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
