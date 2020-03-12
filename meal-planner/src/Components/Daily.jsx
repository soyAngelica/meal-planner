import React, { Component, Children } from 'react';
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
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';




const styles = theme => ({
    Carousel:{
        width: '100%'
    },
    cardRoot: {
        marginTop: 100,
    },
    root: {
        maxWidth: '100%',
        margin: '0 auto',
        width: '100%',
        marginBottom: 30,
        marginTop: 100,
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
        super(props)
        this.state  = {
            plan: [],
            intervalIsSet: false,

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
        const plans = this.state.plan
        const n = plans.length
        console.log(`a ver dime de qué va ${n}`);
        const { classes } = this.props;
        const options = {

            year: "numeric",
            month:"long",
            day:"numeric"}

        return (
            <React.StrictMode>
                <Grid container spacing={1} className={classes.cardRoot}> 
                    <Grid container item xs={12}  >    
                    <CarouselProvider className={classes.Carousel}
                    naturalSlideWidth={100}
                    naturalSlideHeight={250}
                    totalSlides={20}
                    >

                    <Slider>
                        
                         { plans.length <= 0
                        ? '🥣'
                        : plans.map((planN) => (
                            <Slide index={planN.id} key={planN.id} className={classes.slide} >                             
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
                                        <Typography variant="body2" component="p">
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
                            </Slide>
                        ))}
                        




                        {/* <Slide index={0}>I am the first Slide.</Slide>
                        <Slide index={1}>I am the second Slide.</Slide>
                        <Slide index={2}>I am the third Slide.</Slide> */}
                    </Slider>


                   
                    </CarouselProvider>






                   


                    </Grid>
                </Grid> 
            </React.StrictMode>         
                           
                
        )
    }
}



export default withStyles(styles)(Daily);
