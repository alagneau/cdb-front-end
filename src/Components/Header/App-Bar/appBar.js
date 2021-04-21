import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

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
  let history = useHistory();
  const classes = useStyles();
  const links = ['/', '/computer', '/company', '/user']

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    history.push(links[newValue])
    setValue(newValue)
  };


  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Home" />
        <Tab label="Computers" />
        <Tab label="Companies" />
        <Tab label="Users" />
        <Button variant="outlined" color="secondary" onClick={() => history.push("/logout")}>Log Out</Button>
      </Tabs>
    </Paper>
  );
}