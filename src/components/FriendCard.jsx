import React from 'react'
import { Card, CardHeader, IconButton, Box } from "@material-ui/core"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import AllOutIcon from '@material-ui/icons/AllOut'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import FriendList from "./FriendList.jsx"
import CustomAvatar from "./utils/CustomAvatar.jsx"

export default function FriendCard(props) {
  return (
    props.show ?
    <Card id={props.node.id}>
      <CardHeader
      avatar={
        <CustomAvatar name={props.node.name} element={props.node.element}/>
      }
      action={
        <Box>
          <IconButton edge="end" onClick={props.onFetchClick}>
            <AllOutIcon/>
          </IconButton>
          <IconButton edge="end" onClick={() => props.onToggleSuspectClick(props.node.id)}>
            {props.data[props.node.id].suspected ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
          <IconButton onClick={props.onToggleFriendClick}>
            { props.showFriends ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
          </IconButton>
        </Box>
      }
      title={props.node.name}
      subheader={`ID: #${props.node.id} | Element: ${props.node.element}`}
      />
      <FriendList
        show={props.showFriends}
        isFromSuspected={props.data[props.node.id].suspected}
        data={props.data}
        friends={props.node.friends}
        onAddClick={props.onAddFriendClick}
        onToggleSuspectClick={props.onToggleSuspectClick}/>
    </Card> :
    null
  )
}