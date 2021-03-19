import React from 'react';
import 'components/Appointment/styles.scss'
import useVisualMode from 'hooks/useVisualMode'

import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Form from 'components/Appointment/Form'

export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />} */}
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      { mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} /> }
      { mode === CREATE && <Form interviewers={props.interviewers} save={() => transition(SHOW)} onCancel={() => back(EMPTY)} />}
    </article>
  )
};