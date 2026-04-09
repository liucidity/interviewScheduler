import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  const interviewerListClass = classNames(
    "interviewers__item", {"interviewers__item--selected":props.selected}
  );
  return (
    <li onClick={props.setInterviewer} className={interviewerListClass}>
      <img src={props.avatar}
      alt={props.name}
      className="interviewers__item-image"
      onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='38' r='22' fill='%23888'/%3E%3Cellipse cx='50' cy='90' rx='36' ry='26' fill='%23888'/%3E%3C/svg%3E"; }} />
      {props.selected && props.name}
    </li>
  )
}