import React from "react"
import { List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, CardContent } from "@material-ui/core"
import { IconButton } from '@material-ui/core'
import AllOutIcon from '@material-ui/icons/AllOut'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import CustomAvatar from "./utils/CustomAvatar.jsx"

import "../stylesheets/content.css"

export default function FriendList(props) {
  return (
    props.show ?
    <CardContent>
      <List>
        {
          props.friends.map(friend =>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <CustomAvatar name={friend.name} element={friend.element}/>
              </ListItemAvatar>
              <ListItemText
                primary={friend.name}
                secondary={`ID: #${friend.id} | Element: ${friend.element}`}
              />
              <ListItemSecondaryAction id={friend.id}>
                {
                  props.isFromSuspected && props.data[friend.id].suspected ?
                  <IconButton edge="end" onClick={props.onAddClick}>
                    <AllOutIcon />
                  </IconButton>
                  : null
                }
                <IconButton edge="end" onClick={() => props.onToggleSuspectClick(friend.id)}>
                  {props.data[friend.id].suspected ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        }
      </List>
    </CardContent> :
    null
  )
}