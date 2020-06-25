import React from "react"
import { CssBaseline } from '@material-ui/core'
import { Box } from '@material-ui/core'

import Header from "./Header.jsx"
import Content from "./Content.jsx"
import Footer from "./Footer.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startID: null,
    }
  }

  handleSubmit(e) {
    if (e.key === "Enter") {
      console.log("User entered ID: ", e.target.value)
      this.setState({
        startID: e.target.value,
      })
      e.target.value = ""
    }
  }

  render() {
    return (
      <Box>
        <CssBaseline />
        <Header onSearchBarChange={(e) => this.handleSubmit(e)} />
        <Content startID={this.state.startID}/>
        <Footer />
      </Box>
    )
  }
}

export default App