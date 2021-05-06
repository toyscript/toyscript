import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <AppBar
        position="static"
        style={{ backgroundColor: "rgb(246, 233, 180)" }}
      >
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Link to="/aboutus">
                <img
                  src="/images/aboutus.png"
                  style={{ width: "150px", height: "25px" }}
                  alt="aboutus"
                />
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" style={{ color: 'darkgray'}}>
                copyright © 2021 LAM OR NOT LAM. All rights reserved.{" "}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Footer;
