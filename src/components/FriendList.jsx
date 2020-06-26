import React from "react"
import { List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, CardContent } from "@material-ui/core"
import { Avatar, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

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
                <Avatar>{friend.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={friend.name}
                secondary={`ID: #${friend.id} | Element: ${friend.element}`}
              />
              <ListItemSecondaryAction id={friend.id}>
                <IconButton edge="end" onClick={props.onClickFriend}>
                  <AddIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => console.log("test")}>
                  <DeleteIcon />
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