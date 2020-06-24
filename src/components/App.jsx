import React from "react"
import SearchBar from "./SearchBar.jsx"
import Body from "./Body.jsx"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startID: null,
    }
  }

  handleSubmit(e) {
    this.setState({
      startID: e.target.value,
    })
  }

  render() {
    return (
      <div>
        <SearchBar onChange={(e) => this.handleSubmit(e)}/>
        <Body startID={this.state.startID}/>
      </div>
    )
  }
}

export default App