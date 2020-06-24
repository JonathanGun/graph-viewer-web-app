import React from "react";
import TextField from '@material-ui/core/TextField';

function SearchBar(props) {
  return <TextField id="outlined-basic" label="ID" onChange={props.onChange} helperText="Enter valid ID (1-180), ex: 8, 120, ..." variant="outlined" />
}

export default SearchBar;