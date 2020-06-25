import React from 'react'
import { Toolbar, Typography, Container } from '@material-ui/core'
import FriendList from "./FriendList.jsx"
import FriendGraph from "./FriendGraph.jsx"
import { Button, Box } from "@material-ui/core"

import "../stylesheets/content.css"

const getLink = function(id) {
  return `https://avatar.labpro.dev/friends/${id}`
}

const invalidResult = {
  startID: -1,
  name: "Not Found",
  friends: [],
  element: null,
};

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: {},
      lastClick: null,
      isLoading: false,
      showFriends: true,
      showGraph: true,
    }
    this.data = {}
    this.links = {}
    this.graphData = {
      nodes: [],
      links: [],
    }
  }

  changeState(id) {
    this.setState({
      isLoading: true
    })

    if (!isNaN(id)) {
      fetch(getLink(id))
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
              var currentNode = {
                id: result.id,
                name: result.name,
                friends: result.friends,
                element: result.element,
              }
              this._addNode(currentNode)
              this.setState({
                nodes: {
                  ...this.state.nodes,
                  [result.id]: currentNode,
                },
                isLoading: false,
                lastClick: id,
              })
            } else {
              this.setState({
                isLoading: false,
              })
            }
          }
        )
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  _addNode(node) {
    console.log("Added new node:", node)
    this.data[node.id] = {
      name: node.name,
      element: node.element,
    }
    Object.values(node.friends).map((friend) => { this.data[friend.id] = { name: friend.name, element: friend.element } })
    this.links[node.id] = Object.values(node.friends).map((friend) => { return { source: node.id, target: friend.id } })
  }

  _removeNode(id) {
    console.log("Removed node:", id)
    delete this.links[id]
  }

  toggleFriendChanged() {
    this.setState({
      showFriends: !this.state.showFriends
    })
  }

  toggleGraphChanged() {
    this.setState({
      showGraph: !this.state.showGraph
    })
  }

  handleNodeClick(e) {
    if (e in this.links) {
      this._removeNode(e)
      return
    }
    if (e == -1) {
      e = Math.ceil(Math.random() * 185)
      console.log("Randomizing...", e)
    }
    this.changeState(e)
  }

  handleListClick(e) {
    e = e.target
    if (!e.id) e = e.parentNode.parentNode
    if (e.id) this.handleNodeClick(e.id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.startID !== this.props.startID && !(this.props.startID in this.state.nodes)) {
      this.changeState(this.props.startID)
    }
  }

  render(props) {
    var inner = <Container maxWidth="md"><Typography>Loading...</Typography></Container>
    if (!this.state.isLoading) {
      this.graphData.links = [].concat.apply([], Object.values(this.links))
      this.graphData.nodes = Array.from(new Set([].concat.apply([], this.graphData.links.map((node) => [node.source, node.target])))).map((id) => { return { id: id, name: this.data[id].name, element: this.data[id].element } })
      var lastNode = this.state.nodes[this.state.lastClick] ? this.state.nodes[this.state.lastClick] : invalidResult
      inner =
        <div>
          <Container maxWidth="md">
            <Typography variant="h6" key={lastNode.id}>
              {lastNode.name}
            </Typography>
            {
              lastNode.id !== -1 ?
              <Typography paragraph>
                Element: {lastNode.element}
              </Typography>
              : null
            }

            <Button onClick={() => this.toggleFriendChanged()}>
              Friends: {this.state.showFriends?"ON":"OFF"}
            </Button>

            <Button onClick={() => this.toggleGraphChanged()}>
              Graph: {this.state.showGraph?"ON":"OFF"}
            </Button>

            {
              lastNode.friends && this.state.showFriends ? 
              <Box mb={4}>
                <FriendList friends={lastNode.friends} onClickFriend={(e) => this.handleListClick(e)}/>
              </Box>
              : null
            }
          </Container>

          <Container maxWidth="lg">
            {
              this.graphData.nodes.length > 0 && this.state.showGraph ?
              <FriendGraph data={this.graphData} onNodeClick={(e) => this.handleNodeClick(e)}/>
              : null
            }
          </Container>
        </div>
    }

    return (
      <div className="content">
        <main>
          <Toolbar />
          { inner }
        </main>
      </div>
    )
  }
}

export default Content