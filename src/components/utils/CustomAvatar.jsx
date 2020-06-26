import React from 'react'
import { indigo, lightBlue, green, deepOrange } from '@material-ui/core/colors'
import { Avatar } from '@material-ui/core'

const colorMap = {
  water: indigo[300],
  air: lightBlue[300],
  earth: green[600],
  fire: deepOrange[400],
}

export default function CustomAvatar(props) {
  return (
    <Avatar style={{backgroundColor: colorMap[props.element]}}>{props.name.charAt(0)}</Avatar>
  )
}