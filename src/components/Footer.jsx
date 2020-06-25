import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'

import "../stylesheets/footer.css"

export default function Footer() {
  return (
    <div className="footer">
	    <Box mu = { 4 } p = { 4 } bgcolor = "secondary.main">
		    <Container maxWidth="lg">
				<Typography color="primary">This is a sample footer</Typography>
			</Container>
	   	</Box>
   	</div>
  );
}