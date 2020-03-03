import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
    root: {
        maxWidth: '100%',
        margin: '0 auto',
        width: '100%',
        marginBottom: 30,
        marginTop: 50,
    },
    media: {
        height: 140,
    },
    info: {
        background: '#eb1e5f',
        color: 'white'
    }
})


class Daily extends Component {
    constructor(props) {
        super(props); 
        this.state  = {
            plan: [],
            intervalIsSet: false
        };
    }
    getPlan = () => {
        fetch('http://localhost:3001/meals/plans')
        .then((plan) => plan.json())
        .then((res) => this.setState({ plan: res.plan }))
        .catch(function(error) {
            console.log(error.message);
        });
    };

 
    componentDidMount() { 
        this.getPlan();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getPlan, 1000);
            this.setState({ intervalIsSet: interval });
          }
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
      }

    render() {
        const plans = this.state.plan;
        const { classes } = this.props;
        const options = {

            year: "numeric",
            month:"long",
            day:"numeric"}

        return (
            <Grid container spacing={1} disableGutters={false} className={classes.cardRoot}> 
                <Grid container item xs={12}  >     
                    { plans.length <= 0
                    ? '🥣'
                    : plans.map((planN) => (
                        <div key={planN.id} className={classes.root}>                             
                            <h2>{ (new Date(planN.dateP)).toLocaleDateString('en-US', options) }
                               </h2>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                    />
                                    <CardContent className={classes.info}>
                                    <Typography gutterBottom variant="h5" component="h3">
                                        Breakfast
                                    </Typography>
                                    <Typography variant="body2" color="light" component="p">
                                    {planN.breakfast.nombre}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                    />
                                    <CardContent className={classes.info}>
                                    <Typography gutterBottom variant="h5" component="h3">
                                       Lunch
                                    </Typography>
                                    <Typography variant="body2" color="light" component="p">
                                    {planN.lunch.nombre}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                    />
                                    <CardContent className={classes.info}>
                                    <Typography gutterBottom variant="h5" component="h3">
                                    Dinner
                                    </Typography>
                                    <Typography variant="body2" color="light" component="p">
                                    {planN.dinner.nombre}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>                            
                        </div>
                    ))}
                </Grid>
             </Grid> 
        )
    }
}


export default withStyles(styles)(Daily);