import React from "react"
import { List, ListItem, ListItemText } from "@material-ui/core"


import "../stylesheets/content.css"

export default function FriendList(props) {
  return (
    <List>
      {
        props.friends.map(friend =>
          <div class={friend.element}>
            <ListItem divider button id={friend.id} onClick={props.onClickFriend}>
              <ListItemText primary={friend.name}/>
            </ListItem>
          </div>
        )
      }
    </List>
  )
}