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
  const theInterview = {
    interviewer: state.interviewers[interview.interviewer], 
    student: interview.student
  }

  return theInterview;
};

export function getInterviewersForDay(state, day) {
  const interviewDays = [];

  state.days.forEach((daySched) => {
    if (daySched.name === day) {
      daySched.interviewers.forEach((appt) => {
        interviewDays.push(state.interviewers[appt])
      })
    }
  })

  return interviewDays;
};