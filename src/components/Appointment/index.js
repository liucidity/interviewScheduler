import React from "react";
import Header from "./Header";
import Confirm from "./Confirm";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"
import uuid from 'uuid';


import "components/Appointment/styles.scss"


export default function Appointment(props) {
  console.log(props);
  let interview = props.interview;
  console.log('appointment interview', interview);
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  function deleteInterview() {

    transition(SAVING, true)
    props.deleteInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(() => transition(ERROR_DELETE, true))
    // interview = null;

  }

  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="saving" />}
      {mode === DELETING && <Status message="deleting" />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          interviewID={props.id}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === CONFIRM && <Confirm onConfirm={deleteInterview} message={"delete?"} onCancel={back} />}
      {mode === EDIT && <Form interviewers={props.interviewers} interviewer={interview.interviewer.id} student={interview.student} onSave={save} onCancel={back} />}
      {mode === ERROR_SAVE && <Error message={"error saving"} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={"error deleting"} onClose={back} />}
    </article>

  )
}