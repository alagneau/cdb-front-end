import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [activeRedirect, setRedirect] = useState(false)
  let nextPath = "/test"

  const redirect = (link) => {
    nextPath = link
    setRedirect(!activeRedirect)
    console.log(nextPath)
    
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" onClick={()=>{redirect("/computer")}}>Computer</Button>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" onClick={()=>{redirect("/company")}}>Company</Button>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" onClick={()=>{redirect("/user")}}>User</Button>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" onClick={()=>{redirect("/logout")}}>Logout</Button>
          </Typography>
        </Toolbar>
      </AppBar>
      {activeRedirect && <Redirect to={nextPath}>Test</Redirect>}
    </div>
  );
}