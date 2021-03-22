import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {


	switch (action.type) {
		case SET_DAY:
			return { ...state, day: action.day };
		case SET_APPLICATION_DATA:
			return {
				...state,
				days: action.days,
				appointments: action.appointments,
				interviewers: action.interviewers,
			};
		case SET_INTERVIEW:
			const appointment = {
				...state.appointments[action.id],
				interview: { ...action.interview },
			};
		
			const appointments = {
				...state.appointments,
				[action.id]: appointment,
			};

			const spots = updateSpots(state.day, state.days, appointments);
			return { ...state, appointments, days:spots };

		default:
			throw new Error(
				`Tried to reduce with unsupported action type: ${action.type}`,
			);
	}
}

export default function useApplicationData() {
	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => dispatch({ type: SET_DAY, day });

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

		const spots = updateSpots(state.day, state.days, appointments);

		return axios
			.put(`/api/appointments/${id}`, { interview })
			.then(() => dispatch({ type: SET_INTERVIEW, id, interview, days: spots }));
	}

	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		const spots = updateSpots(state.day, state.days, appointments);

		return axios
			.delete(`/api/appointments/${id}`)
			.then(() => dispatch({type: SET_INTERVIEW, id, interview: null, days: spots }));
	}

	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		]).then((all) => {
			dispatch({
				type: SET_APPLICATION_DATA,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			});
		});
	}, []);

	return { state, setDay, bookInterview, cancelInterview };
}
