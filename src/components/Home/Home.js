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
import { Search, Add } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import { Tooltip } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Input from '@material-ui/core/Input';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import escapeRegExp from 'escape-string-regexp'

class Home extends PureComponent {
    constructor (props) {
        super(props);
        this.inputLabel = React.createRef(null);
    }

    state = {
        categoria: '',
        labelWidth: 0,
        open: false,
        title: '',
        description: '',
        imageUrl: '',
        generi: '',
        categoriaInput: [],
        query: ''
    }

    componentDidMount = () => {
        this.setLabelWidth()
    }
    
    handleClose = () => {
        this.setState({ open: false })
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleChange = event => {
        this.setState(state => ({ ...state, [event.target.name]: event.target.value}))
        console.log(this.state)
    }

    handleFormChange = event => {
        console.log(event.target)
        this.setState({ ...this.state, [event.target.id]: event.target.value })
    }

    handleAddNewBook = (book) => {
        const { addNewBook } = this.props;
        console.log(book)
        addNewBook(book)
    }

    setLabelWidth = e => {
        console.log(this.inputLabel)
        this.setState({ labelWidth: this.inputLabel.current.offsetWidth })
    }

    render () {
        const { books, addBook, props, classes } = this.props;
        const { labelWidth, categoria, open, query } = this.state; 
        const match = new RegExp(escapeRegExp(query.split(' ').join('').toLowerCase(), 'i'))
        const match2 = new RegExp(escapeRegExp(categoria), 'i')
        let arrayCards = [];
        arrayCards = books.filter(el => match2.test(el.generi)).filter(el => match.test(el.title.split(' ').join('').toLowerCase())).map(el => 
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
                        placeholder="Cerca nuovi libri..."
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
                <Tooltip title="Aggiungi un nuovo libro">
                    <Fab color="primary" className={classes.addButtonBottom} onClick={this.handleOpen}>
                        <Add />
                    </Fab>
                </Tooltip>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    scroll={'paper'}
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogTitle id="scroll-dialog-title">Aggiungi un nuovo libro</DialogTitle>
                    <DialogContent dividers={true}>
                    <div className={clsx(classes.dFlex, classes.alignBaseline)} style={{ paddingTop: '10px'}}>
                        <Typography variant="overline" component="p" style={{ marginRight: '30px' }}>Titolo</Typography>
                        <FormControl className={clsx(classes.dFlex)}>
                            <InputLabel htmlFor="title">Titolo</InputLabel>
                            <Input id="title" value={this.state.title} onChange={this.handleFormChange} />
                        </FormControl>
                    </div>
                    <div className={clsx(classes.dFlex, classes.alignBaseline)} style={{ paddingTop: '10px'}}>
                        <Typography variant="overline" component="p" style={{ marginRight: '30px' }}>Descrizione</Typography>
                        <FormControl className={clsx(classes.dFlex)}>
                            <InputLabel htmlFor="description">Descrizione</InputLabel>
                            <Input id="description" value={this.state.description} onChange={this.handleFormChange} />
                        </FormControl>
                    </div>
                    <div className={clsx(classes.dFlex, classes.alignBaseline)} style={{ paddingTop: '10px'}}>
                        <Typography variant="overline" component="p" style={{ marginRight: '30px' }}>Url immagine</Typography>
                        <FormControl className={clsx(classes.dFlex)}>
                            <InputLabel htmlFor="imageUrl">Url immagine</InputLabel>
                            <Input id="imageUrl" value={this.state.imageUrl} onChange={this.handleFormChange} />
                        </FormControl>
                    </div>
                    <div className={clsx(classes.dFlex, classes.alignBaseline)} style={{ paddingTop: '10px'}}>
                        <Typography variant="overline" component="p" style={{ marginRight: '30px' }}>Generi</Typography>
                        <FormControl 
                        variant="outlined" 
                        className={classes.formControl}
                        >
                            <InputLabel ref={this.inputLabel} htmlFor="categoriaInput">
                                Categorie
                            </InputLabel>
                            <Select
                            autoWidth
                            multiple
                            value={this.state.categoriaInput}
                            onChange={this.handleChange}
                            input={<OutlinedInput labelWidth={labelWidth} name="categoriaInput" id="categoriaInput" />}
                            >
                            <MenuItem value={'Horror'}>Horror</MenuItem>
                            <MenuItem value={'Giallo'}>Giallo</MenuItem>
                            <MenuItem value={'Fantasy'}>Fantasy</MenuItem>
                            <MenuItem value={'Avventura'}>Avventura</MenuItem>
                            <MenuItem value={'Psicologico'}>Psicologico</MenuItem>
                            <MenuItem value={'Sci-Fi'}>Sci-Fi</MenuItem>
                            <MenuItem value={'Letteratura e poesia'}>Letteratura e poesia</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Annulla
                    </Button>
                    <Button onClick={() => this.handleAddNewBook({
                        title: this.state.title,
                        description: this.state.description,
                        imageUrl: this.state.imageUrl,
                        generi: this.state.categoriaInput
                    })} color="primary">
                        Aggiungi
                    </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        )
    }
};

export default withStyles(styles)(Home);