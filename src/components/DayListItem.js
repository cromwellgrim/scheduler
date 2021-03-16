import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss'

export default function DayListItem(props) {

  const formatSpots = () => 
  (props.spots ? `${props.spots} spot${props.spots >1 ? `s` : ``} remaining` : `no spots remaining`)
  

  const DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li 
    onClick={() => props.setDay(props.name)}
    className={DayListItemClass}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  )
}