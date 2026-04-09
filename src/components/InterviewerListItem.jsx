import React, { useState } from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  const [imgError, setImgError] = useState(false);
  const interviewerListClass = classNames(
    "interviewers__item",
    {"interviewers__item--selected": props.selected},
    {"interviewers__item--no-avatar": props.selected && imgError}
  );
  return (
    <li onClick={props.setInterviewer} className={interviewerListClass}>
      {!imgError && (
        <img src={props.avatar}
        alt={props.name}
        className="interviewers__item-image"
        onError={() => setImgError(true)} />
      )}
      {(props.selected || imgError) && props.name}
    </li>
  )
}