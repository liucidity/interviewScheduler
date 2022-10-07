import React, {useState} from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  const reset = ()=> {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = ()=>{
    reset();
    //why use function here
    props.onCancel();
  }
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          /*
            This must be a controlled component
            your code goes here
          */
         value={student}
         onChange={(event) => {setStudent(event.target.value)}}
        />
      </form>
      <InterviewerList 
        interviewers={props.interviewers}
        // unsure here
        value={interviewer}
        onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={props.onSave}>Save</Button>
      </section>
    </section>
  </main>)
}