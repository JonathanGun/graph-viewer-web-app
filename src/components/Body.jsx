import React from "react"
import { Grid, Card, CardContent, Typography } from "@material-ui/core"


class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      id: null,
      name: null,
      friends: [],
      element: null,
    };
  }

  fetchData(id) {
    if (!isNaN(id)) {
      fetch("https://avatar.labpro.dev/friends/" + id)
        .then(res => res.json())
        .then(
          (result) => {
            result = result.payload
            if (result) {
              this.setState({
                isLoaded: true,
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
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }

  render() {
    if (this.props.startID !== this.state.id) {
      this.fetchData(this.props.startID)
    }

    const { error, isLoaded, id, name, friends, element } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <h2 key={id}>{name}</h2>
        <p>Element: {element} </p>
        <p>Friends:</p>
        <Grid container spacing = { 3 } > {
          friends.map(friend =>
            <Grid item key={friend.id} xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography>{friend.id}</Typography>
                  <Typography>{friend.name}</Typography>
                  <Typography>{friend.element}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        }
        </Grid>
      </div>
      );
    }
  }
}

export default Body