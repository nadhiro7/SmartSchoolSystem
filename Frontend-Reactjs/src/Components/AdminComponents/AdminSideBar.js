import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Stack, ButtonBase } from '@mui/material';
import { School } from '@mui/icons-material';
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
export default function AdminSideBar ()
{
    const theme = useTheme();
    const [ open, setOpen ] = React.useState( false );


    return (
        <>
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
        </ >
    );
}
