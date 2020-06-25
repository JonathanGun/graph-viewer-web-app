import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function FriendSwitch(props) {
  return <Switch
  checked = { props.showFriends }
  onChange = { props.onChange }
  name = "toggleFriends"
  inputProps = { { 'aria-label': 'primary checkbox' } }
  />
}