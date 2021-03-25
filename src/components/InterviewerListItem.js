import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
	const interviewersClass = classNames("interviewers__item", {
		"interviewers__item--selected": props.selected,
	});

	const imgClass = classNames("interviewers__item-image", {
		"interviewers__item--selected": props.selected,
	});

	return (
		<li onClick={props.setInterviewer} className={interviewersClass}>
			<img className={imgClass} src={props.avatar} alt={props.name} />
			{props.selected && props.name}
		</li>
	);
}
