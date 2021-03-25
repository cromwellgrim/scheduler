import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

function InterviewerList(props) {
	const interviewers = props.interviewers.map((interviewer) => {
		return (
			<InterviewerListItem
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={interviewer.id === props.value}
				setInterviewer={(event) => props.onChange(interviewer.id)}
			/>
		);
	});

	return (
		<>
			<h2 className="interviewers__header text--light">Interviewers</h2>
			<ul className="interviewers__list">{interviewers}</ul>
		</>
	);
}

InterviewerList.propTypes = {
	interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
