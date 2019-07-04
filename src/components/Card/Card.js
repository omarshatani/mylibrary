import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Add, Favorite, Done } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  card: {
    width: 345,
    margin: '10px 0'
  },
  button: {
    margin: 0,
  },
  media: {
    height: 300,
    backgroundSize: 'contain'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  chip: {
    margin: '5px 2px',
    height: '22px',
    fontSize: '11px'
  },
  bottomActions: {
    width: '90%',
    margin: '0 auto'
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'center'
  },
  title: {
    paddingBottom: theme.spacing(1),
    textAlign: 'center'
  },
  subheader: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  add: {
    marginLeft: '5px',
  },
  body2: {
    paddingTop: theme.spacing(1),
    fontSize: '0.8rem'
  },
  extended: {
    marginRight: theme.spacing(1)
  },
  cardsActionsRoot: {
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center'
  },
  formControlRoot: {
    minWidth: 120
  },
  selectAction: {
    width: '65%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'baseline',
    marginBottom: '13px'
  }
}));

export default function BookCard(props) {
  console.log(props)
  const classes = useStyles();

  let generi = []
  if (props.generi) {
    generi =  props.generi.split(',');
  } 

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  const [values, setValues] = React.useState({
    stato: props.stato,
  });

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          title: classes.title,
          subheader: classes.subheader
        }}
        title={props.title}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.title}
      />
      <CardContent>
        <div>
          {
            generi.map(text => <Chip key={text} label={text} color="primary" className={classes.chip} />)
          }
        </div>
        <Typography variant="body2" color="textSecondary" component="p" classes={{
          body2: classes.body2
        }}> {props.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing 
        className={classes.bottomActions} 
        classes={{
          root: classes.cardsActionsRoot
        }}>
        {
         !props.aggiunto ? 
            <Button 
              variant="contained" 
              size="medium" 
              color="primary" 
              className={classes.button}
              onClick={props.handleAddBook}
              >
              Aggiungi
              <Add className={classes.add} fontSize="small" />
            </Button>
          : null
        }

        {
          props.aggiunto ?
            props.props.location.pathname === '/' ?
              <Button 
                disabled
                variant="contained" 
                size="medium" 
                color="primary" 
                className={classes.button}
                onClick={props.handleAddBook}
                >
                Aggiunto
                <Done className={classes.add} fontSize="small" />
              </Button>
              :
              <>
              <Tooltip title="Aggiungi ai preferiti">
                <Favorite color="secondary" fontSize="large" />
              </Tooltip>
              <div className={classes.selectAction}>
                <Typography style={{ marginRight: '10px'}}>STATO</Typography>
                <FormControl className={classes.formControl} classes={{
                  root: classes.formControlRoot
                }}>
                <InputLabel htmlFor="stato">Seleziona</InputLabel>
                <Select
                  value={props.stato}
                  onChange={handleChange}
                  input={<Input name="stato" id="stato" />}
                >
                  <MenuItem value="Non iniziato">
                    <em>Non iniziato</em>
                  </MenuItem>
                  <MenuItem value={'In lettura'}>In lettura</MenuItem>
                  <MenuItem value={'Completato'}>Completato</MenuItem>
                </Select>
              </FormControl>
            </div>
            </>
            : null
        }

      </CardActions>
    </Card>
  );
}