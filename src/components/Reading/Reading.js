import React, { PureComponent } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { styles } from '../styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '../Card/Card';

class Reading extends PureComponent {

    constructor (props) {
        super(props)
        this.inputLabel = React.createRef(null);
    }

    state = {
        categoria: ''
    }

    componentWillReceiveProps = (prev, next) => {
        console.log(prev)
    } 

    handleChange = event => {
        this.setState(state => ({ ...state, [event.target.name]: event.target.value}))
    }

    render () {
        const { books, props, addBook, removeBook, addFav, removeFav, classes, updateStatus } = this.props;
        console.log(books)
        let arrayCards = []
        arrayCards = books.filter(el => el.stato === 'In lettura').map(el => 
            <Grid item key={el.id} >
                <Card 
                props={props}
                title={el.title} 
                desc={el.description} 
                image={el.imageUrl} 
                stato={el.stato}
                generi={el.generi}
                aggiunto={el.aggiunto === 'true' ? true : false }
                fav={el.favoriti === 'true' ? true : false }
                handleAddBook={() => addBook(el)}
                handleRemoveBook={() => removeBook(el)}
                handleAddFav={() => addFav(el)}
                handleRemoveFav={() => removeFav(el)}
                updateStatus={(newStatus) => updateStatus(el, newStatus)}
                />
            </Grid>
        )

        return (
            <Container maxWidth="lg">
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    >
                    <Typography variant="h2" component="h2">In lettura</Typography>
                </Grid>
                <Grid container spacing={3} justify='center' className={classes.gridPadding}>
                    {
                        arrayCards
                    }
                </Grid>
            </Container>
        )
    }
}

export default withStyles(styles)(Reading);