import React from 'react'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import FriendList from "./FriendList.jsx"

import "../stylesheets/content.css"

export default function Content(props) {
  return (
    <div class="content">
      <main>
  	    <Toolbar />
  	    <FriendList startID={props.startID}/>
  	  </main>
    </div>
  )
}