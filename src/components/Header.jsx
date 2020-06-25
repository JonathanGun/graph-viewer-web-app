import React from "react"
import { Container, Box, Typography } from '@material-ui/core'
import { AppBar, Toolbar } from '@material-ui/core'
import SearchBar from "./SearchBar.jsx"
import HideOnScroll from "./utils/HideOnScroll.jsx"

export default function Header(props) {
  return (
    <Box mb={6}>
      <HideOnScroll>
        <AppBar position="fixed">
          <Container maxWidth="lg">
            <Toolbar>
              <Typography variant="h6" noWrap>Suspector</Typography>
              <Box mx={4} my={1.5}>
              	<SearchBar onChange={props.onSearchBarChange}/>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </Box>
  )
}