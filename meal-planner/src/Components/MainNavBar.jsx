import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Generate from './Generate';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EventIcon from '@material-ui/icons/Event';
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill';
import LocalDiningIcon from '@material-ui/icons/LocalDining';



const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    background: 'black'
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  icons: {
    fontSize: 48,
    color: 'white',
  },
  imeals: {
    float:'right',
    marginRight: 40, 
  }, 
  icalendar: {
    float:'left',
    marginLeft: 40, 
  }, 
  idaily : {
    position: 'absolute',
    left: '45%',
    top:0,
  },
  center: {
    position: 'relative'
  }

}));

export default function MainNavBar() {
  
  const classes = useStyles();
    
    return (
         <AppBar position="fixed"  className={classes.appBar}>
            <Toolbar>
                <Container maxWidth="sm" className={classes.center}>  
                    <Link  to="/Calendar">
                        <EventIcon className={`${classes.icons} ${classes.icalendar}`}/>
                    </Link>
                    <Link  to="/">
                        <LocalDiningIcon  className={`${classes.icons} ${classes.idaily}`} />
                    </Link>
                    <Link  to="/Meals">
                        <OutdoorGrillIcon className={`${classes.icons} ${classes.imeals}`} />
                    </Link>                
                </Container>
            </Toolbar>
        </AppBar>
      
    );

}     
  
