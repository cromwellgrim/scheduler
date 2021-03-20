import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => setState({ ...state, day });

	const getSpotsRemaining = function (day, appointments) {
		let count = 0;
	
		for (const id of day.appointments) {
			const appointment = appointments[id];
			if (!appointment.interview) {
				count++;
			}
		}
		return count;
	};
	
	const updateSpots = function (day, days, appointments) {
		const interviewDay = days.find((item) => item.name === day);
	
		const spotsOpen = getSpotsRemaining(interviewDay, appointments);
	
		const newArray = days.map((item) => {
			if (item.name === day) {
				return { ...item, spots: spotsOpen };
			}
			return item;
		});
	
		return newArray;
	};

	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		const spots = updateSpots(state.day, state.days, appointments)

		return axios
			.put(`/api/appointments/${id}`, { interview })
			.then(() => setState({ ...state, appointments, days: spots}));
	}

	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		}

		const spots = updateSpots(state.day, state.days, appointments)

		return axios
			.delete(`/api/appointments/${id}`)
			.then(() => setState({ ...state, appointment, days: spots}));
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

	return { state, setDay, bookInterview, cancelInterview };
}
