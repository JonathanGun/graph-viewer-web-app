import React from 'react'
import { Toolbar, Container } from '@material-ui/core'
import { Button, Box, IconButton } from "@material-ui/core"
import RefreshIcon from '@material-ui/icons/Refresh'
import { CircularProgress } from '@material-ui/core'

import FriendCard from "./FriendCard.jsx"
import GraphCard from "./GraphCard.jsx"

import "../stylesheets/content.css"

const getLink = function(id) {
  return `https://avatar.labpro.dev/friends/${id}`
}

const TOTAL_SUSPECTS = 186

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
  }

  loadFromAPI(id) {
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

  toggleGraphChanged() {
    this.setState({
      showGraph: !this.state.showGraph
    })
  }

  toggleFriendChanged() {
    this.setState({
      showFriends: !this.state.showFriends
    })
  }

  handleNodeClick(e) {
    if (e === this.state.lastClick) {
      this._removeNode(e)
    } else if (e in this.links) {
      this.setState({
        lastClick: e,
      })
    } else {
      this.loadFromAPI(e)
    }
  }

  handleListClick(e) {
    e = e.target
    while (!e.id) {
      e = e.parentNode
    }
    if (e.id) this.handleNodeClick(e.id)
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
    this.setState({
      lastClick: null,
    })
  }

  _randomAddNode() {
    var n = null
    if (this.links.size > 0) {
      n = Object.keys(this.links)[Math.floor(Math.random() * this.links.size)]
    } else {
      n = Math.ceil(Math.random() * (TOTAL_SUSPECTS - 1))
    }
    console.log("Randomizing...", n)
    this.loadFromAPI(n)
  }

  resetGraph() {
    this.links = {}
    this.setState({
      lastClick: null,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.startID !== this.props.startID && !(this.props.startID in this.state.nodes)) {
      this.loadFromAPI(this.props.startID)
    }
  }

  render() {
    var inner = <CircularProgress color="inherit" />
    if (!this.state.isLoading) {

      var lastNode = this.state.nodes[this.state.lastClick] ? this.state.nodes[this.state.lastClick] : invalidResult
      inner =
        <Container maxWidth="md">
          <FriendCard
            node={lastNode}
            show={this.state.lastClick}
            showFriends={this.state.showFriends}
            onClickFriend={(e) => this.handleListClick(e)}
            onToggleFriendClick={() => this.toggleFriendChanged()}
          />
          <GraphCard
            links={this.links}
            data={this.data}
            show={this.state.lastClick}
            showGraph={this.state.showGraph}
            onNodeClick={(e) => this.handleNodeClick(e)}
            onToggleGraphClick={() => this.toggleGraphChanged()}
          />
        </Container>
    }

    return (
      <Container maxWidth="md">
        <Toolbar />
        <Box mb={4}>
          <Button onClick={() => {this.resetGraph();this._randomAddNode()}}>
            Surprise me
          </Button>
          <Button onClick={() => this._randomAddNode()}>
            Pick Random
          </Button>
          <IconButton onClick={() => this.resetGraph()}> <RefreshIcon /> </IconButton>
        </Box>
        { inner }
      </Container>
    )
  }
}

export default Content