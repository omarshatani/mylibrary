import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Add, FavoriteBorderSharp, Favorite, Done, Remove } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';

class BookCard extends PureComponent {
  // constructor (props) {
  //   super(props);
  // }

  state = {
    stato: ''
  }

  componentWillMount = () => {
    const { stato } = this.props;
    this.setState({ stato })
  }

  handleChange = event => {
    const { updateStatus } = this.props;
    this.setState(state => ({ ...state, [event.target.name]: event.target.value }))
    updateStatus(event.target.value);
  }

  render () {
    let { generi, props, classes, handleAddBook, 
      handleRemoveBook, title, image, desc, aggiunto, 
      fav, handleAddFav, handleRemoveFav } = this.props;
    const { stato } = this.state;
    if (generi) {
      generi = generi.split(',');
    }
    return (
      <Card className={classes.card}>
        <CardHeader
          classes={{
            title: classes.title,
            subheader: classes.dFlex
          }}
          title={title}
        />
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
          <div>
            {
              generi.map(text => <Chip key={text} label={text} color="primary" className={classes.chip} />)
            }
          </div>
          <Typography variant="body2" color="textSecondary" component="p" classes={{
            body2: classes.body2
          }}> {desc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing 
          className={classes.bottomActions} 
          classes={{
            root: classes.cardsActionsRoot
          }}>
          {
           !aggiunto ? 
              <Button 
                variant="contained" 
                size="medium" 
                color="primary" 
                className={classes.button}
                onClick={handleAddBook}
                >
                Aggiungi
                <Add className={classes.marginL1} fontSize="small" />
              </Button>
            : null
          }
  
          {
            aggiunto ?
              props.location.pathname === '/' ?
                <Button 
                  disabled
                  variant="contained" 
                  size="medium" 
                  color="primary" 
                  className={classes.button}
                  onClick={handleAddBook}
                  >
                  Aggiunto
                  <Done className={classes.marginL1} fontSize="small" />
                </Button>
                :
                <div className={clsx(classes.dFlex, classes.alignCenter, classes.w100)}>
                  <div style={{ width: '20%'}}>
                    {
                      !fav ?
                      <Tooltip title="Aggiungi ai preferiti">
                        <FavoriteBorderSharp className={classes.favIcon} onClick={handleAddFav} />
                      </Tooltip>
                      :
                      <Tooltip title="Aggiunto ai preferiti">
                        <Favorite color="secondary" className={classes.favIcon} onClick={handleRemoveFav} />
                      </Tooltip>
                    }
                  </div>
                  <div className={classes.selectAction} style={{ width: '80%'}}>
                    <Typography style={{ marginRight: '10px'}}>STATO</Typography>
                    <FormControl className={classes.formControl} classes={{
                      root: classes.formControlRoot
                    }}>
                      <InputLabel htmlFor="stato">{props.location.pathname !== '/mybooks/' ? '' : 'Seleziona'}</InputLabel>
                      <Select
                        value={stato}
                        disabled={props.location.pathname !== '/mybooks/'}
                        onChange={this.handleChange}
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
                  {
                    props.location.pathname === '/mybooks/' ?
                      <div className={clsx(classes.justifyCenter, classes.dFlex)} style={{ width: '100%'}}>
                        <Button 
                          variant="contained" 
                          size="medium" 
                          color="primary" 
                          className={classes.button}
                          onClick={handleRemoveBook}
                          >
                          Rimuovi
                          <Remove className={classes.marginL1} fontSize="small" />
                        </Button>
                      </div>
                    : null
                  }
                </div>
              : null
          }
  
        </CardActions>
      </Card>
    );
  }

}

export default withStyles(styles)(BookCard);