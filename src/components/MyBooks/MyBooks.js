import React, { PureComponent } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { styles } from '../styles';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '../Card/Card';
import { Search } from '@material-ui/icons';
import escapeRegExp from 'escape-string-regexp'

class MyBooks extends PureComponent {

    constructor (props) {
        super(props)
        this.inputLabel = React.createRef(null);
    }

    state = {
        labelWidth: 0,
        categoria: '',
        query: ''
    }

    componentDidMount = () => {
        this.setLabelWidth();
    }

    componentWillReceiveProps = (prev, next) => {
        console.log(prev)
    } 

    handleChange = event => {
        this.setState(state => ({ ...state, [event.target.name]: event.target.value}))
    }

    setLabelWidth = e => {
        this.setState({ labelWidth: this.inputLabel.current.offsetWidth })
    }

    render () {
        const { books, props, addBook, removeBook, classes, addFav, removeFav, updateStatus } = this.props;
        const { labelWidth, categoria, query } = this.state;
        console.log(books)
        const match = new RegExp(escapeRegExp(query.split(' ').join('').toLowerCase(), 'i'))
        const match2 = new RegExp(escapeRegExp(categoria), 'i')
        let arrayCards = [];
        arrayCards = books.filter(el => match2.test(el.generi)).filter(el => match.test(el.title.split(' ').join('').toLowerCase())).map(el => 
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
                    <Typography variant="h2" component="h2">La mia libreria</Typography>
                </Grid>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    className={classes.searchRoot}
                    >
                        <FormControl 
                        variant="outlined" 
                        className={classes.formControl}
                        >
                            <InputLabel ref={this.inputLabel} htmlFor="categoria">
                                Categorie
                            </InputLabel>
                            <Select
                            autoWidth
                            value={categoria}
                            onChange={this.handleChange}
                            input={<OutlinedInput labelWidth={labelWidth} name="categoria" id="categoria" />}
                            >
                            <MenuItem value="">
                                <em>Nessuna</em>
                            </MenuItem>
                            <MenuItem value={'Horror'}>Horror</MenuItem>
                            <MenuItem value={'Giallo'}>Giallo</MenuItem>
                            <MenuItem value={'Fantasy'}>Fantasy</MenuItem>
                            <MenuItem value={'Avventura'}>Avventura</MenuItem>
                            <MenuItem value={'Psicologico'}>Psicologico</MenuItem>
                            <MenuItem value={'Sci-Fi'}>Sci-Fi</MenuItem>
                            <MenuItem value={'Letteratura e poesia'}>Letteratura e poesia</MenuItem>
                            </Select>
                        </FormControl>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search fontSize="small" />
                        </div>
                        <InputBase
                        placeholder="Cerca tra i libri..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'Cerca' }}
                        onChange={(event) => this.setState({ query: event.target.value })}
                        />
                    </div>
                </Grid>
                <Grid container spacing={3} justify='center'>
                    {
                        arrayCards
                    }
                </Grid>
            </Container>
        )
    }
}

export default withStyles(styles)(MyBooks);