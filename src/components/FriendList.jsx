import React from "react"
import { List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, CardContent } from "@material-ui/core"
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

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
                <IconButton edge="end" onClick={props.onAddClick}>
                  <AddIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => props.onDeleteClick(friend.id)}>
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