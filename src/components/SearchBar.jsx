import React from "react";
import TextField from '@material-ui/core/TextField'


export default function SearchBar(props) {
  return (
    <TextField
	  label="ID"
	  onKeyPress={props.onChange}
	  helperText="Enter valid ID (1-186), ex: 8, 120, ..."
	  />
  )
}