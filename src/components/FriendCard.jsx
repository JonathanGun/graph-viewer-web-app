import React from 'react'
import { Card, CardHeader, Avatar, IconButton, Box } from "@material-ui/core"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

import FriendList from "./FriendList.jsx"

export default function FriendCard(props) {
  return (
    props.show ?
    <Box mb={3}>
        <Card>
          <CardHeader
          avatar={<Avatar>{props.node.name.charAt(0)}</Avatar>}
          action={<IconButton onClick={props.onToggleFriendClick}><KeyboardArrowDownIcon/></IconButton>}
          title={props.node.name}
          subheader={`ID: #${props.node.id} | Element: ${props.node.element}`}
          />
          <FriendList show={props.showFriends} friends={props.node.friends} onClickFriend={props.onClickFriend}/>
        </Card>
      </Box> :
    null
  )
}