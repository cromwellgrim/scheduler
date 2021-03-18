export function getAppointmentsForDay(state, day) {
  const filterDays = [];

  state.days.forEach((daySched) => {
    if (daySched.name === day) {
      daySched.appointments.forEach((appt) => {
        filterDays.push(state.appointments[appt])
      })
    }
  })

  return filterDays;
};

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const theInterview = {interviewer: state.interviewers[interview.interviewer], student: interview.student}

  return theInterview;
};