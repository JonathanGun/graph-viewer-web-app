import React from 'react'
import { Typography, Box } from "@material-ui/core"
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import FriendGraph from "./FriendGraph.jsx"

class GraphCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        nodes: [],
        links: [],
      },
    }
  }

  render() {
    this.state.data.links = [].concat.apply([], Object.values(this.props.links))
    this.state.data.nodes = Array.from(new Set([].concat.apply([], this.state.data.links.map((node) => [node.source, node.target])))).map((id) => {
      return {
        id: id,
        name: this.props.data[id].name,
        element: this.props.data[id].element
      }
    })
    return (
      this.props.show ?
      <Box mb={3}>
        <Card>
          <CardHeader
            action={
              <IconButton onClick={this.props.onToggleGraphClick}>
                { this.props.showGraph ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
              </IconButton>
            }
            title="Graph Visualizer"
          />
          {
            this.props.showGraph && this.state.data.nodes.length > 0 ?
            <CardContent>
              <FriendGraph data={this.state.data} onNodeClick={this.props.onNodeClick}/>
                <Typography variant="caption" color="textSecondary">Click on a node to expand node</Typography><br/>
                <Typography variant="caption" color="textSecondary">Click again to delete</Typography><br/>
                <Typography variant="caption" color="textSecondary">Drag node to move node</Typography><br/>
                <Typography variant="caption" color="textSecondary">Drag anywhere else to move graph</Typography><br/>
              </CardContent>
            : null
          }
        </Card>
      </Box> :
      null
    )
  }
}

export default GraphCard