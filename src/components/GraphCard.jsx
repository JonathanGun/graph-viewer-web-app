import React from 'react'
import { Typography, Box } from "@material-ui/core"
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

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
            action={<IconButton onClick={this.props.onToggleGraphClick}><KeyboardArrowDownIcon/></IconButton>}
            title="Graph Visualizer"
          />
          {
            this.props.showGraph && this.state.data.nodes.length > 0 ?
            <CardContent>
              <FriendGraph data={this.state.data} onNodeClick={this.props.onNodeClick}/>
            </CardContent>
            : null
          }
          <CardContent>
            <Typography paragraph variant="caption">Click on a node to expand node</Typography>
            <Typography paragraph variant="caption">Click again to delete</Typography>
            <Typography paragraph variant="caption">Drag node to move node</Typography>
            <Typography paragraph variant="caption">Drag anywhere else to move graph</Typography>
          </CardContent>
        </Card>
      </Box> :
      null
    )
  }
}

export default GraphCard