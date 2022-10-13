import { useState,useEffect } from "react";
import Axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  // initial get data from database
  useEffect(() => {
    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments'),
      Axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))

    })
  }, []);

// calculate spots to be used when adding or deleting an appointment
  const calculateSpots = (appointments) => {
    let targetDay = state.days.find((day)=>{
      if(day.name === state.day) return day;
    })
    // const numberOfSpots;
    const appointmentsForDay = targetDay.appointments;

    const nullAppointments = appointmentsForDay.filter((appointmentID)=>{

      if (appointments[appointmentID].interview === null) {
        return appointments[appointmentID]
      }
    })

    const numberOfSpots = nullAppointments.length;
    targetDay.spots = numberOfSpots

    const days = [...state.days].map((day)=> {
      if(day.name === state.name) return targetDay;
      return day;
    })

    return days;
  }

  // create new appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // return Axios({
    //   method: "put",
    //   url: `/api/appointments/${id}`,
    //   data: { ...appointment }
    // })
    return Axios.put(`/api/appointments/${id}`, {...appointment})
    .then((response) => {
      setState((prev)=> ({ ...prev, appointments }))
      
    })
    .then(()=> {
      // console.log("calculateSpots", calculateSpots(appointments))
      const days = calculateSpots(appointments);
      // const updatedDays = null;
      setState((prev)=> ({...prev, days }))
    })
  }
  // cancel appointments
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // setState({ ...state, appointments })
    // return Axios({
    //   method: "delete",
    //   url: `/api/appointments/${id}`,
    //   data: { ...appointment }
    // })
    return Axios.delete(`/api/appointments/${id}`,{...appointment})
    .then((response) => {
      
      setState({ ...state, appointments })
    })
    .then(()=> {
      // console.log("calculateSpots", calculateSpots(appointments))
      const days = calculateSpots(appointments);
      // const updatedDays = null;
      setState((prev)=> ({...prev, days }))
    })
  }
  
  // set day state
  const setDay = day => {
    setState({ ...state, day });
  }
  
  return {state,bookInterview,setDay,deleteInterview}
}