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

class Home extends PureComponent {
    constructor (props) {
        super(props);
        this.inputLabel = React.createRef(null);
    }

    state = {
        categoria: '',
        labelWidth: 0
    }

    componentDidMount = () => {
        this.setLabelWidth()
    }

    handleChange = event => {
        this.setState(state => ({ ...state, [event.target.name]: event.target.value}))
    }

    setLabelWidth = e => {
        console.log(this.inputLabel)
        this.setState({ labelWidth: this.inputLabel.current.offsetWidth })
    }

    render () {
        const { books, addBook, props, classes } = this.props;
        const { labelWidth, categoria } = this.state; 
        let arrayCards = [];
        arrayCards = books.map(el => 
            <Grid item key={el.id}>
                <Card 
                props={props}
                title={el.title} 
                desc={el.description} 
                image={el.imageUrl} 
                stato={el.stato}
                generi={el.generi}
                aggiunto={el.aggiunto === 'true' ? true : false}
                handleAddBook={() => addBook(el)}
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
                    <Typography variant="h2" component="h2">Home</Typography>
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
                            <MenuItem value={'Romanzo'}>Romanzo</MenuItem>
                            <MenuItem value={'Giallo'}>Giallo</MenuItem>
                            <MenuItem value={'Fantasy'}>Fantasy</MenuItem>
                            <MenuItem value={'Avventura'}>Avventura</MenuItem>
                            <MenuItem value={'Thriller'}>Thriller</MenuItem>
                            </Select>
                        </FormControl>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search fontSize="small" />
                        </div>
                        <InputBase
                        placeholder="Cerca nuovi libri..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'Cerca' }}
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
};

export default withStyles(styles)(Home);