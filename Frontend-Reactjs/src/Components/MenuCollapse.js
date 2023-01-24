import React from 'react';
import { ListItemButton, ListItemIcon, List, ListItemText, Typography, useTheme, Collapse } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuItem from './MenuItem';
import ItemCollapse from './ItemCollapse';
import { ExpandMore } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
function MenuCollapse ( props )
{
    const navigate = useNavigate();
    const location = useLocation();
    const [ open, setOpen ] = React.useState( false );
    const openCollapse = () =>
    {
        setOpen( !open );
        if ( props.item.component )
        {
            navigate( props.item.url );
        }
    };
    React.useEffect( () =>
    {
        props.drawerOpen ? setOpen( open ) : setOpen( false );
    } );
    const theme = useTheme();
    return (
        <>
            <ListItemButton
                sx={ {
                    borderRadius: `10px`,
                    height: '40px',
                    width: '90%',
                } }
                onClick={ openCollapse }
                selected={ props.item.component ? false : open }
            >
                <ListItemIcon>
                    { props.item.icon }
                </ListItemIcon>
                <ListItemText primary={ <Typography variant={ open ? 'h5' : 'body1' } color="inherit" sx={ { my: 'auto' } }>
                    { props.item.text }
                </Typography> } />
                <ListItemIcon>
                    { <ExpandMore sx={ {
                        transform: !open ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.3s'
                    } } /> }
                </ListItemIcon>
            </ListItemButton>
            <Collapse in={ open } timeout="auto" sx={ { width: '80%', alignSelf: 'flex-end', mt: '5px' } } unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    sx={ {
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        '&:after': {
                            content: "''",
                            position: 'absolute',
                            left: '0px',
                            top: 0,
                            height: '100%',
                            width: '1px',
                            opacity: 1,
                            background: theme.palette.primary.light
                        }
                    } }
                >
                    { props.item.sousItem.map( ( item, index ) => (
                        <ItemCollapse key={ index } text={ item.text } url={ item.url }></ItemCollapse>
                    ) ) }
                </List>
            </Collapse>
        </>
    );
}

export default MenuCollapse;