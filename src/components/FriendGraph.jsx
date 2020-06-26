import React from 'react'
import { Graph } from "react-d3-graph"


const elementMap = {
  water: "https://vignette.wikia.nocookie.net/avatar/images/5/50/Waterbending_emblem.png/revision/latest?cb=20130729182922",
  fire: "https://vignette.wikia.nocookie.net/avatar/images/4/4b/Firebending_emblem.png/revision/latest?cb=20130729203233",
  air: "https://vignette.wikia.nocookie.net/avatar/images/8/82/Airbending_emblem.png/revision/latest?cb=20130729210446",
  earth: "https://vignette.wikia.nocookie.net/avatar/images/e/e4/Earthbending_emblem.png/revision/latest?cb=20130729200732",
}

function setElementImage(data) {
  data.nodes.map((node) => node.svg = elementMap[node.element])
  return data
}

// creted from https://danielcaldas.github.io/react-d3-graph/sandbox/index.html?data=small
const myConfig = {
  "automaticRearrangeAfterDropNode": false,
  "collapsible": false,
  "directed": true,
  "focusAnimationDuration": 1,
  "focusZoom": 1,
  "height": 500,
  "highlightDegree": 1,
  "highlightOpacity": 0.2,
  "linkHighlightBehavior": true,
  "maxZoom": 2,
  "minZoom": 0.4,
  "nodeHighlightBehavior": true,
  "panAndZoom": false,
  "staticGraph": false,
  "staticGraphWithDragAndDrop": false,
  "width": 1200,
  "d3": {
    "alphaTarget": 0.05,
    "gravity": -100,
    "linkLength": 100,
    "linkStrength": 1,
    "disableLinkForce": false
  },
  "node": {
    "color": "#d3d3d3",
    "fontColor": "black",
    "fontSize": 8,
    "fontWeight": "normal",
    "highlightColor": "red",
    "highlightFontSize": 12,
    "highlightFontWeight": "bold",
    "highlightStrokeColor": "SAME",
    "highlightStrokeWidth": 1.5,
    "labelProperty": "name",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": true,
    "size": 180,
    "strokeColor": "none",
    "strokeWidth": 1.5,
    "svg": "",
    "symbolType": "circle"
  },
  "link": {
    "color": "#d3d3d3",
    "fontColor": "red",
    "fontSize": 10,
    "fontWeight": "normal",
    "highlightColor": "blue",
    "highlightFontSize": 8,
    "highlightFontWeight": "bold",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": false,
    "semanticStrokeWidth": true,
    "strokeWidth": 1.5,
    "markerHeight": 3,
    "markerWidth": 2,
  }
}


export default function FriendGraph(props) {
  return <Graph
  id = "graph-id" // id is mandatory, if no id is defined rd3g will throw an error
  data = { setElementImage(props.data) }
  config = { myConfig }
  onClickNode = { props.onNodeClick }
  />
}