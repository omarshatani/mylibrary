import { fade } from '@material-ui/core/styles';
import { red, green, amber } from '@material-ui/core/colors';

const drawerWidth = 220;
export const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    bottom: 0
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  space: {
    padding: theme.spacing(1, 2)
  },
  paper: {
    backgroundColor: '#2f3133'
  },
  itemColor: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  form: {
    padding: '20px 0'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  searchRoot: {
      padding: '45px 0'
  },
  search: {
    display: 'flex',
    height: '55px',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    backgroundColor: fade(theme.palette.common.white, 0.2),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // marginLeft: theme.spacing(1),
      width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
        // marginLeft: theme.spacing(1),
        width: '50%',
      },
    },
    searchIcon: {
      // width: theme.spacing(7),
      width: '10%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputRoot: {
      color: 'inherit',
      width: '90%',
    },
    inputInput: {
      // padding: theme.spacing(2, 1, 2, 9),
      transition: theme.transitions.create('width'),
      width: '100%',
      // [theme.breakpoints.up('sm')]: {
      //   width: 130,
      //   '&:focus': {
      //     width: 200,
      //   },
      // },
    },
    cardMargin: {
      margin: '10px 0'
    },
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
    },
    title: {
      paddingBottom: theme.spacing(1),
      textAlign: 'center',
      fontSize: '1.2rem'
    },
    marginL1: {
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
    },
    dFlex: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    w100: {
      width: '100%'
    },
    alignCenter: {
      alignItems: 'center'
    },
    justifyCenter: {
      justifyContent: 'center'
    },
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    favIcon: {
      fontSize: 25,
      cursor: 'pointer'
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    margin: {
      margin: theme.spacing(1)
    },
})
