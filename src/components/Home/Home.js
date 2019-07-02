import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '../Card/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faSearch
} from '@fortawesome/free-solid-svg-icons'

const Home = props => {
    const classes = useStyles();
    console.log(classes)
    const handleChange = (event) => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
          }));
    }
    const [values, setValues] = React.useState({
        categoria: '',
    });
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    
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
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} htmlFor="categoria">
                            Categorie
                        </InputLabel>
                        <Select
                        autoWidth
                        value={values.categoria}
                        onChange={handleChange}
                        input={<OutlinedInput labelWidth={labelWidth} name="categoria" id="categoria" />}
                        >
                        <MenuItem value="">
                            <em>Nessuna</em>
                        </MenuItem>
                        <MenuItem value={'Horror'}>Horror</MenuItem>
                        <MenuItem value={'Horror'}>Horror</MenuItem>
                        <MenuItem value={'Horror'}>Horror</MenuItem>
                        <MenuItem value={'Horror'}>Horror</MenuItem>
                        <MenuItem value={'Horror'}>Horror</MenuItem>
                        </Select>
                    </FormControl>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <FontAwesomeIcon icon={faSearch} size="sm" />
                    </div>
                    <InputBase
                    placeholder="Cerca.."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'Cerca' }}
                    />
                </div>
            </Grid>
            <Grid container>
                <Card />
            </Grid>
        </Container>
    )
};

export default Home;