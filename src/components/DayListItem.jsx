import React from "react";

import "components/DayListItem.scss"
import classNames from "classnames";
const formatSpots = (numberOfSpots) => {
  if (numberOfSpots === 0) {
    return "no spots"
  }
  if (numberOfSpots === 1) {
    return (numberOfSpots + " spot")
  }
  return numberOfSpots + " spots"

}

export default function DayListItem(props) {
  console.log('day selected', props.selected)
  let dayClass = classNames("day-list__item",{ "day-list__item--selected" : props.selected, "day-list__item--full":props.spots===0});
  return (
    <li className={dayClass} selected={props.selected} onClick={()=> {props.setDay(props.name)}} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  )

}; 