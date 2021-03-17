import React, { useState } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import DayListItem from "components/DayListItem";
import InterviewerList from "components/InterviewerList";
import InterviewerListItem from "components/InterviewerListItem";
import Appointment from "components/Appointment/index"

const days = [
  {
       id: 1,
       name: "Monday",
       spots: 2
     },
     {
       id: 2,
       name: "Tuesday",
       spots: 5
     },
     {
       id: 3,
       name: "Wednesday",
       spots: 0
     }
];

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

const appointments = [
  {
    id: 1,
    time: "12PM",
  },
  {
    id: 2,
    time: "1PM",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2PM"
  },
  {
    id: 4,
    time: "3PM",
    interview: {
      student: "Polkadot Patterson",
      interviewer: {
        id: 3,
        name: "Mildred Nazier",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4PM",
    interview: {
      student: "Coolname Galvanic",
      interviewer: {
        id: 3,
        name: "Mildred Nazier",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 6,
    time: "5PM"
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");

  const appts = appointments.map((appt) => {
    return (
    <Appointment 
      key={appt.id} 
      {...appt}
    />
    )
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
  <DayList days={days} day={day} setDay={setDay} />
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
