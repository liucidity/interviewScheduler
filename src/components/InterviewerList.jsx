import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"
import PropTypes from "prop-types";



// TypeError: Cannot read properties of undefined (reading 'map') React JS
export default function InterviewerList(props) {
  let interviewers = props.interviewers;
  let interviewersArray;

  
  if(interviewers) {
    interviewersArray = interviewers.map((interviewer)=>{
      return <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id===props.value}
      setInterviewer={()=>props.onChange(interviewer.id)}
      />
    })
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list">
        {interviewersArray}
      </ul>
    </section>
  ) 

  
}


InterviewerList.propTypes= {
  interviewers: PropTypes.array.isRequired
};