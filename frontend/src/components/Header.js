import React from "react";
import { AppBar, Grid, Toolbar} from "@material-ui/core";
import { Link } from "react-router-dom";


function Header() {
  return(
    <>
      <AppBar
        position="static"
        style={{ backgroundColor : "rgb(246,233,180" }}
      >
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Link to="/">
                <img 
                  src="/images/home.png"
                  style = {{ width: "110px", height:"40px" }}
                  alt="home"
                />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/ServiceInfo">
                <img 
                  src="/images/menu1.png"
                  style = {{ width: "200px", height:"25px", alignItems:"flex-end" }}
                  alt="service information page"
                />
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}


export default Header;