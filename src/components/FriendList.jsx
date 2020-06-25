import React from "react"
import { Typography, Button } from "@material-ui/core"
import { List, ListItem, ListItemText } from "@material-ui/core"
import { Box } from "@material-ui/core"

import "../stylesheets/content.css"

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      name: "Not Found",
      friends: [],
      element: null,
      showFriends: true,
    };
  }

  toggleFriendChanged() {
    this.setState({
      showFriends: !this.state.showFriends
    })
  }

  fetchData(id) {
    if (!isNaN(id)) {
      fetch("https://avatar.labpro.dev/friends/" + id)
        .then(res => res.json())
        .then(
          (result) => {
            result = result.payload
            if (result) {
              var unique_ids = {}
              result.friends = result.friends.filter((friend) => {
                if (friend.id in unique_ids || friend.id === id) {
                  return false
                } else {
                  unique_ids[friend.id] = true
                  return true
                }
              })
              this.setState({
                id: result.id,
                name: result.name,
                friends: result.friends,
                element: result.element,
              });
            } else {
              this.setState({
                id: -1,
                name: "Not Found",
                friends: [],
                element: null,
              })
            }
          },
        )
    }
  }

  render() {
    if (this.props.startID !== this.state.id) {
      this.fetchData(this.props.startID)
    }

    const { id, name, friends, element } = this.state;
    return (
      <Box mb={4}>
        <Typography variant="h6" key={id}>{name}</Typography>
        {
          this.state.id !== -1 ?
          <Typography paragraph>
            Element: {element}
          </Typography>
          : null
        }

        <Button onClick={() => this.toggleFriendChanged()}>
          Friends: {this.state.showFriends?"ON":"OFF"}
        </Button>

        {
          this.state.showFriends ? 
          <List>{
            friends.map(friend =>
              <div class={friend.element}>
                <ListItem divider button key={friend.id}>
                  <ListItemText primary={friend.name}/>
                </ListItem>
              </div>
            )
          }</List>
          : null
        }
      </Box>
    )
  }
}

export default FriendList