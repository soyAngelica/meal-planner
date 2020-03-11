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
import TouchCarousel, {clamp, range} from 'react-touch-carousel';



const styles = theme => ({
    cardRoot: {
        marginTop: 100,
    },
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


// const data = plan.map((planN) => ({
//     key: planN.id,
//     breakfast: planN.breakfast.nombre,
//     lunch: planN.lunch.nombre,
//     dinner: planN.dinner.nombre 
// }))

const data = range(0, 12).map(n => ({
    title: `Card ${n}`,
    text: `This is card ${n}`
  }))

// alert(data.length)


const queryPage = parseInt(window.location.search.slice(1))
const startPage = queryPage ? clamp(queryPage, 0, data.length - 1) : 0

const carouselWidth = clamp(window.innerWidth, 0, 960)
const cardSize = carouselWidth


class Daily extends Component {
    constructor(props) {
        super(props)
        const renderedData = this.getRenderedData(startPage)        
        this.state  = {
            plan: [],
            intervalIsSet: false,
            page: clamp(startPage, 0, data.length - renderedData.length),
            renderedData
        };
        this.defaultCursor = (data.length - renderedData.length) - startPage
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

      getRenderedData (cursor) {
        switch (cursor) {
          case 0: {
            return data.slice(0, 3)
          }
          case data.length - 1: {
            return data.slice(data.length - 3)
          }
          default: {
            return data.slice(cursor - 1, cursor + 2)
          }
        }
      }


      modPage = () => {
        const cursor = this.carousel.getCursor()
        const {page, renderedData} = this.state
        if (Math.round(cursor) !== cursor) return
        if ( // Do we reach the edge of the window but not the edge of the data?
          (page !== 0 && cursor === 0) ||
          (page !== data.length - renderedData.length && cursor === 1 - renderedData.length)
        ) {
          // Then move the window.
          const newCursor = -1 // put cursor at center
          const newPage = page - cursor + newCursor
          this.setState({
            page: newPage,
            renderedData: this.getRenderedData(newPage)
          })
          // This kinda breaks grabbing. But not a big deal I guess.
          this.carousel.modAs(newCursor)
        }
      }
    
      renderCard = (index, _, cursor) => {
        const {page} = this.state
        const item = data[page + index]
    
        return (
          <div key={index} className='carousel-card'>
            <div className='carousel-card-inner'>
              <div className='carousel-title'>{item.title}</div>
              <div className='carousel-text'>{item.text}</div>
            </div>
          </div>
        )
      }

    render() {
        const {renderedData} = this.state
        const CarouselContainer = this.container

        const plans = this.state.plan

        const data1 = plans.map((planN) => ({
            key: planN.id,
            breakfast: planN.breakfast.nombre,
            lunch: planN.lunch.nombre,
            dinner: planN.dinner.nombre 
        }))   





        const { classes } = this.props;
        const options = {

            year: "numeric",
            month:"long",
            day:"numeric"}

        return (
            <React.StrictMode>
                <Grid container spacing={1} disableGutters={false} className={classes.cardRoot}> 
                    <Grid container item xs={12}  >
                        <TouchCarousel
                        ref={elt => { this.carousel = elt }}
                        component={CarouselContainer}
                        cardSize={cardSize}
                        cardCount={renderedData.length}
                        loop={false}
                        renderCard={this.renderCard}
                        defaultCursor={this.defaultCursor}
                        />
                    </Grid>
                </Grid> 
            </React.StrictMode>         
                           
                
        )
    }
}



export default withStyles(styles)(Daily);