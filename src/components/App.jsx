import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import SearchBar from "./SearchBar.jsx";

const words = [
  "fee",
  "fi",
  "fo",
  "fum",
  "fee",
  "fi",
]

function App() {
  return (
    <div>
      <SearchBar />
    	<Grid container spacing = { 3 } > {
          words.map(word =>
            <Grid item xs={12} sm={12/words.length}>
              <Card>
                <CardContent>
                  <Typography>{word}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        }
    	</Grid>
    </div>
  )
}

export default App;