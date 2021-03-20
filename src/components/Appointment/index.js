import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error"

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
  const SAVING = "SAVING";
	const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
	const ERROR_SAVE = "ERROR_SAVE";
	const ERROR_DELETE = "ERROR_DELETE";

	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY,
	);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
    transition(SAVING, true);
		props
		 .bookInterview(props.id, interview)
		 .then(() => transition(SHOW))
		 .catch(error => transition(ERROR_SAVE, true))
	}

  function cancel(event) {
    transition(DELETING, true);
    props
		 .cancelInterview(props.id)
		 .then(() => transition(EMPTY))
		 .catch(error => transition(ERROR_DELETE, true))
  }

	return (
		<article className="appointment">
			<Header time={props.time} />
			{/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />} */}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer.name}
					onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
				/>
			)}
      {mode === EDIT && (
				<Form
					interviewer={props.interview.interviewer.id}
					interviewers={props.interviewers}
          name={props.interview.student}
					onSave={save}
					onCancel={() => back(SHOW)}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onSave={save}
					onCancel={() => back(EMPTY)}
				/>
			)}
      {mode === CONFIRM && (
				<Confirm 
        onCancel={() => transition(SHOW)}
        onConfirm={cancel}
				message="Are you sure you want to cancel your appointment?"
				/>
				)}
			{mode === SAVING && <Status message="Saving" />}
			{mode === DELETING && <Status message="Deleting" />}
			{mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={() => back(SHOW)} />}
			{mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={() => back(SHOW)} />}
		</article>
	);
}
