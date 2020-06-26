import React from 'react'
import { Card, CardHeader, IconButton, Box } from "@material-ui/core"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import FriendList from "./FriendList.jsx"
import CustomAvatar from "./utils/CustomAvatar.jsx"

export default function FriendCard(props) {
  return (
    props.show ?
    <Box mb={3}>
        <Card>
          <CardHeader
          avatar={
            <CustomAvatar name={props.node.name} element={props.node.element}/>
          }
          action={
            <IconButton onClick={props.onToggleFriendClick}>
              { props.showFriends ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
            </IconButton>
          }
          title={props.node.name}
          subheader={`ID: #${props.node.id} | Element: ${props.node.element}`}
          />
          <FriendList
            show={props.showFriends}
            friends={props.node.friends}
            onAddClick={props.onAddFriendClick}
            onDeleteClick={(to_id) => props.onDeleteFriendClick(props.node.id, to_id)}/>
        </Card>
      </Box> :
    null
  )
}