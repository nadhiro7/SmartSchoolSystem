import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useMediaQuery, Stack, Button, ButtonBase, TextField, OutlinedInput, InputAdornment } from '@mui/material';
import { School, Search, DarkMode, LightMode } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Notifications from './../Notifications';
import ProfileSection from './../ProfileSection';
import { ThemeContext, themes } from './../../Themes/ThemeContext';
import { shouldForwardProp } from '@mui/system';
import MenuList from './../MenuList';
import { appMenu, otherMenu } from './../../Routes/AdminMenu';

const drawerWidth = 220;

const openedMixin = ( theme ) => ( {
    width: drawerWidth,
    transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    } ),
    overflowX: 'hidden',
} );

const closedMixin = ( theme ) => ( {
    transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    } ),
    overflowX: 'hidden',
    width: `${ document.body.clientWidth > 600 ? `calc( ${ theme.spacing( 6 ) } + 1px )` : '0px' }`,
    [ theme.breakpoints.up( 'sm' ) ]: {
        width: `calc(${ theme.spacing( 7 ) } + 1px)`,
    },
} );

const DrawerHeader = styled( 'div' )( ( { theme } ) => ( {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '50px',
    padding: theme.spacing( 0, 1 ),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
} ) );

const AppBar = styled( MuiAppBar, {
    shouldForwardProp: ( prop ) => prop !== 'open',
} )( ( { theme, open } ) => ( {
    height: '58px',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create( [ 'width', 'margin' ], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    } ),
    ...( open && {

        transition: theme.transitions.create( [ 'width', 'margin' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        } ),
    } ),
} ) );

const Drawer = styled( MuiDrawer, { shouldForwardProp: ( prop ) => prop !== 'open' } )(
    ( { theme, open } ) => ( {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transform: 'translateY(58px)',
        boxSizing: 'border-box',
        height: 'calc(100vh - 58px)',
        position: 'sticky',
        top: '0',
        overflow: 'auto',
        ...( open && {
            ...openedMixin( theme ),
            '& .MuiDrawer-paper': openedMixin( theme ),
        } ),
        ...( !open && {
            ...closedMixin( theme ),
            '& .MuiDrawer-paper': closedMixin( theme ),
        } ),
    } ),
);
const OutlineInputStyle = styled( OutlinedInput, { shouldForwardProp } )( ( { theme } ) => ( {
    width: 400,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    background: theme.palette.primary.light,
    borderColor: theme.palette.primary.dark,
    '& input': {
        background: theme.palette.primary.light,
        paddingLeft: '4px !important'
    },
    [ theme.breakpoints.down( 'lg' ) ]: {
        width: 250
    },
    [ theme.breakpoints.down( 'md' ) ]: {
        width: '100%',
        marginLeft: 4,
    }
} ) );
export default function MiniDrawer ()
{
    const theme = useTheme();
    const [ open, setOpen ] = React.useState( false );

    const handleDrawer = () =>
    {
        setOpen( !open );
    };
    const mode = React.useContext( ThemeContext );
    const mobileSize = useMediaQuery( theme.breakpoints.down( 'sm' ) );
    return (
        <Box sx={ { display: 'flex' } }>
            <CssBaseline />
            <AppBar color="inherit" position="fixed" open={ open } elevation={ 0 }>
                <Toolbar sx={ { height: '58px' } } alignItems="center">
                    <Stack spacing={ 2 } direction='row' alignItems='center'>
                        <Stack direction='row' alignItems='center' sx={ { display: { xs: 'none', sm: 'flex' } } }>
                            <ButtonBase
                                aria-label="open drawer"
                                edge="start"

                                sx={ {
                                    width: 'fit-content',
                                    pl: '0px !important',
                                    transform: 'translateX(-10px)',
                                } }
                            >
                                <School color="secondary" fontSize='large' sx={ { mr: '5px' } } />
                                <Typography variant="h4" noWrap component="div">
                                    My Smart School
                                </Typography>
                            </ButtonBase>
                        </Stack>

                        <ButtonBase
                            aria-label="open drawer"
                            onClick={ handleDrawer }
                            edge="start"

                            sx={ {
                                borderRadius: '7px !important',
                                width: '30px !important',
                                height: '30px',
                                color: theme.palette.secondary.main,
                                transition: '0.3s',
                                backgroundColor: theme.palette.secondary.light,
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.dark,
                                    color: 'white',
                                },
                            } }
                        >
                            <MenuIcon fontSize='small' />
                        </ButtonBase>
                        <Box width='300px' sx={ { display: { xs: 'none', md: 'block' } } }>
                            <OutlineInputStyle fullWidth
                                placeholder='Search'
                                startAdornment={
                                    <InputAdornment position='start'>
                                        <Search fontSize='small' color={ theme.palette.grey[ 500 ] } />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <ButtonBase
                                            aria-label="search filter"
                                            edge="start"

                                            sx={ {
                                                borderRadius: '5px !important',
                                                width: '30px !important',
                                                height: '25px',
                                                color: 'white',
                                                transition: '0.3s',
                                                backgroundColor: theme.palette.secondary[ 200 ],
                                                '&:hover': {
                                                    background: theme.palette.secondary.dark,
                                                },
                                            } }
                                        >
                                            <FilterAltIcon fontSize='small' />
                                        </ButtonBase>
                                    </InputAdornment>
                                }
                            />

                        </Box>
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={ 3 } sx={ { ml: 'auto' } }>
                        <Stack spacing={ 2 } direction='row' alignItems='center'>
                            <ButtonBase
                                aria-label="change Theme"
                                edge="start"
                                onClick={ () => mode.changeTheme() }
                                sx={ {
                                    borderRadius: '7px !important',
                                    width: '30px !important',
                                    height: '30px',
                                    color: theme.palette.primary.main,
                                    transition: '0.3s',
                                    backgroundColor: theme.palette.primary.light,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark,
                                        color: 'white',
                                    },
                                } }
                            >
                                { mode.theme === 'dark' ? <LightMode fontSize='small' /> : <DarkMode fontSize='small' /> }
                            </ButtonBase>
                            <Notifications />
                        </Stack>
                        <ProfileSection />
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer variant='permanent' open={ open }>
                <DrawerHeader>
                    <Stack direction='row' alignItems='center' sx={ { display: { xs: 'flex', sm: 'none' } } }>
                        <ButtonBase
                            aria-label="open drawer"
                            edge="start"

                            sx={ {
                                width: 'fit-content',
                                pl: '0px !important',
                                transform: 'translateX(-10px)',
                            } }
                        >
                            <School color="secondary" fontSize='large' sx={ { mr: '5px' } } />
                            <Typography variant="h4" noWrap component="div">
                                My Smart School
                            </Typography>
                        </ButtonBase>
                    </Stack>
                </DrawerHeader>
                <Divider />
                <Stack spacing={ 0.5 }>
                    <Typography variant='subtitle1' sx={ { transform: 'translateX(10px)' } }>{ open ? 'Application' : 'App' }</Typography>
                    <MenuList list={ appMenu } drawerOpen={ open } />
                </Stack>
                <Divider />
                <Stack spacing={ 1 } >
                    <Typography variant='subtitle1' sx={ { transform: 'translateX(10px)' } }>Other</Typography>
                    <MenuList list={ otherMenu } drawerOpen={ open } />
                </Stack>

            </Drawer>
            <Box component="main" sx={ { transform: 'translateY(58px)' } }>
                <Box bgcolor={ theme.palette.primary.light } sx={ { m: '20px', overflow: 'auto', height: 'calc(100vh + 58px)', p: '10px', borderRadius: '10px' } } >
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                        neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                        tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                        tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                        posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>
                </Box>
            </Box>
        </Box >
    );
}
