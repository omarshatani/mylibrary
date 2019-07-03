import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Add, Favorite } from '@material-ui/icons';
import bookCover from '../../images/bookCover.jpg';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  card: {
    width: 345,
  },
  button: {
    margin: 0
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
    width: '85%',
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
  body2: {
    paddingTop: theme.spacing(1),
    fontSize: '0.8rem'
  },
  extended: {
    marginRight: theme.spacing(1)
  },
  cardsActionsRoot: {
    padding: '10px 0'
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  console.log(props)

  const myBook = false;

  let generi = ['Horror', 'Documentario', 'Sci-Fi', 'Mistero', 'Azione', 'Psicologico']

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          title: classes.title,
          subheader: classes.subheader
        }}
        title="Oceanic"
      />
      <CardMedia
        className={classes.media}
        image={bookCover}
        title="Oceanic"
      />
      <CardContent>
        <div>
          {
            generi.map(text => <Chip key={text} label={text} color="primary" className={classes.chip} />)
          }
        </div>
        <Typography variant="body2" color="textSecondary" component="p" classes={{
          body2: classes.body2
        }}>
        Oceanic is a generous, romantic, and ambitious look at the different stages of life, 
        and how we experience the love and wonder that lead us to become 
        more fully realized and compassionate as we grow each decade.
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.bottomActions} classes={{
        root: classes.cardsActionsRoot
      }}>
        {
          myBook ? 
          <ButtonGroup 
            variant="contained"
            color="primary" aria-label="Outlined primary button group">
            <Button variant="contained" color="primary" className={classes.button}>
              Aggiungi
            </Button>
            <Button className={classes.button}>
              <Add />
            </Button>
          </ButtonGroup>
          : 
          // <Fab color="secondary" size="small" aria-label="Favourite" className={classes.fab}>
            <Tooltip title="Aggiungi ai preferiti">
              <Favorite color="secondary" fontSize="large" />
            </Tooltip>
            

        }

      </CardActions>
    </Card>
  );
}