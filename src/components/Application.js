import React, { useState, useEffect } from "react";

import Axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Axios({
      method: "put",
      url: `/api/appointments/${id}`,
      data: { ...appointment }
    })
      .then((response) => {
        console.log(response)
        setState({ ...state, appointments })
      })
    // .catch((err) => console.log(err.message))
  }

  function deleteInterview(id) {
    console.log('delete appointment', id)
    console.log("states", state.appointments[id])
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    console.log('appointment to delete', appointment)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("updatedappointments", appointments)
    // setState({ ...state, appointments })
    return Axios({
      method: "delete",
      url: `/api/appointments/${id}`,
      data: { ...appointment }
    })
      .then((response) => {
        console.log(response)
        setState({ ...state, appointments })
      })
  }


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  console.log('dailyAppmt', dailyAppointments);
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  // const appointmentsValues = Object.values(appointments);

  // useEffect(() => 
  //   Axios.get('/api/days')
  //     .then((response) => {
  //       // setDays(response.data)
  //     })
  // }, []);
  // useEffect(() => {
  //   Axios.get('/api/appointments')

  // }, []);

  useEffect(() => {
    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments'),
      Axios.get('/api/interviewers')
    ]).then((all) => {
      console.log('all responses', all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  let appointmentsArray = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    return <Appointment
      key={appointment.id}
      {...appointment}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview}
      interviewers={dailyInterviewers}
      interview={interview}
    />
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {appointmentsArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
