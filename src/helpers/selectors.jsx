export function getAppointmentsForDay(state, day) {
  let daysArray = state.days
  let appointmentArray = [];
  // if (daysArray.length === 0) return appointmentArray;

  let dayTarget = daysArray.find((dayObject)=> {
    return dayObject.name === day
  })
  if (!dayTarget) return appointmentArray;
  let daysAppointments = [...dayTarget.appointments]

  appointmentArray = daysAppointments.map((appointmentID) => {
      return state.appointments[appointmentID];
    })

    return appointmentArray;
  }
  // const results = daysArray.map((dayObj) => {
  //   if(dayObj.name===day) {

  //   const appointmentObjects = dayObj.appointments.map((id)=> {
  //       return state.appointments[id]
  //     })

  //     return appointmentObjects;
  //   }
  // })

  // console.log(results);
  // return results;


  export function getInterview(state, interview) {
    if (!interview) return null;
    const interviewerId = interview.interviewer;
    const interviewer = state.interviewers[interviewerId];
    const student = interview.student;
    const result = {student: student, interviewer: interviewer};
    console.log('result',result)
    
    console.log('interviewState',state);
    console.log('interview',interview);
    return result;
  }


  export function getInterviewersForDay(state, day) {
  let daysArray = state.days
  let interviewersArray = [];
  // if (daysArray.length === 0) return appointmentArray;

  let dayTarget = daysArray.find((dayObject)=> {
    return dayObject.name === day
  })
  if (!dayTarget) return interviewersArray;
  let daysAppointments = [...dayTarget.interviewers]

  interviewersArray = daysAppointments.map((interviewerId) => {
      return state.interviewers[interviewerId];
    })

    return interviewersArray;
  }