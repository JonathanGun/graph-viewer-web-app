import React from "react";
import TextField from '@material-ui/core/TextField';

function SearchBar() {
  return (
    <form noValidate autoComplete="off">
	  <TextField id="outlined-basic" label="ID" helperText="Enter valid ID (1-180), ex: 8, 120, ..." variant="outlined" />
	</form>
  )
}

export default SearchBar;