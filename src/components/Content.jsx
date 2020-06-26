import React from 'react'
import { Toolbar, Container, Grid } from '@material-ui/core'
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

  toggleSuspectChanged(id) {
    console.log("onToggleSuspectChanged:", id)
    this.data[id].suspected ^= true
    this.forceUpdate()
  }

  handleNodeClick(e) {
    if (e in this.links) {
      this.setState({
        lastClick: e,
        showFriends: true,
      })
    } else {
      this.loadFromAPI(e)
    }
  }

  handleListClick(e) {
    e = e.target
    while (!e.id) e = e.parentNode
    this.handleNodeClick(e.id)
  }

  handleFetchClick(e) {
    e = e.target
    while (!e.id) e = e.parentNode
    this.loadFromAPI(e.id)
  }

  _addNode(node) {
    console.log("Added new node:", node)
    Object.values(node.friends.concat(node)).forEach((friend) => {
      if (!(friend.id in this.data)) {
        this.data[friend.id] = {
          name: friend.name,
          element: friend.element,
          suspected: true,
        }
      }
    })
    this.links[node.id] = Object.values(node.friends).map((friend) => {
      return {
        source: node.id,
        target: friend.id,
      }
    })
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
      nodes: {},
      lastClick: null,
    })
    if (this.state.lastClick) {
      this.loadFromAPI(this.state.lastClick)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.startID !== this.props.startID) {
      if (this.props.startID in this.state.nodes) {
        this.setState({
          lastClick: this.props.startID,
        })
      } else {
        this.loadFromAPI(this.props.startID)
      }
    }
  }

  render() {
    var inner = null
    if (this.state.isLoading && this.state.nodes.size == 0) {
      inner = <CircularProgress color="inherit" />
    } else {
      console.log(this.data)
      var lastNode = this.state.nodes[this.state.lastClick] ? this.state.nodes[this.state.lastClick] : invalidResult
      inner =
        <Grid container justify="center" spacing={2}>
          <Grid item xs>
          <FriendCard
            node={lastNode}
            data={this.data}
            show={this.state.lastClick}
            showFriends={this.state.showFriends}
            onAddFriendClick={(e) => this.handleListClick(e)}
            onToggleFriendClick={() => this.toggleFriendChanged()}
            onToggleSuspectClick={(id) => this.toggleSuspectChanged(id)}
            onFetchClick={(e) => this.handleFetchClick(e)}
          />
          </Grid>
          <Grid item xs>
            <GraphCard
              links={this.links}
              data={this.data}
              show={this.state.lastClick}
              showGraph={this.state.showGraph}
              onNodeClick={(e) => this.handleNodeClick(e)}
              onToggleGraphClick={() => this.toggleGraphChanged()}
            />
          </Grid>
        </Grid>
    }

    return (
      <Container>
        <Toolbar />
        <Box mb={4}>
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