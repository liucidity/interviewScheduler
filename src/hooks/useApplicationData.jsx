import { useState,useEffect } from "react";
import Axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

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

  const setDay = day => setState({ ...state, day });

  return {state,bookInterview,setDay,deleteInterview}
}