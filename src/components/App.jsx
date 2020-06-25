import React from "react"
import { CssBaseline } from '@material-ui/core'
import { Container, Box } from '@material-ui/core'

import Header from "./Header.jsx"
import Content from "./Content.jsx"
import Footer from "./Footer.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startID: null,
      friendListOpen: true,
    }
  }

  handleSubmit(e) {
    this.setState({
      startID: e.target.value,
    })
  }

  render() {
    return (
      <Box>
        <CssBaseline />
        <Box mb={6}>
          <Header onSearchBarChange={(e) => this.handleSubmit(e)} />
        </Box>

        <Container maxWidth="md">
          <Content startID={this.state.startID}/>
        </Container>

        <Footer />
      </Box>
    )
  }
}

export default App