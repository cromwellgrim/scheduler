import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
	const [name, setName] = useState(props.name || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [error, setError] = useState("");

	const reset = () => {
		setName("");
		setInterviewer(null);
	};

	const cancel = () => {
		reset();
		props.onCancel();
	};

	/* validates both that student name is not blank and that an interviewer is chosen before saving */
	function validate() {
		if (name === "") {
			setError("Student name cannot be blank");
			return;
		}
		if (!interviewer) {
			setError("Please choose an Interviewer");
			return;
		}
		setError("");
		props.onSave(name, interviewer);
	}

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off">
					<input
						onSubmit={(event) => event.preventDefault()}
						className="appointment__create-input text--semi-bold"
						name={name}
						value={name}
						type="text"
						placeholder="Enter Student Name"
						onChange={(event) => setName(event.target.value)}
						data-testid="student-name-input"
					/>
				</form>
				<section className="appointment__validation">{error}</section>
				<InterviewerList
					interviewers={props.interviewers}
					value={interviewer}
					onChange={setInterviewer}
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
