import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Circle } from '@mui/icons-material';
function ItemCollapse ( props )
{
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    return (
        <ListItemButton
            sx={ {
                borderRadius: `10px`,
                height: '40px',
                width: '90%',
                mb: '5px'
            } }
            onClick={ () => navigate( props.url ) }
            selected={ `${ props.url }` === location.pathname.substring( 7 ) }

        >
            <ListItemIcon>
                <Circle sx={ { fontSize: "8px", minWidth: '25px' } } />
            </ListItemIcon>
            <ListItemText primary={
                <Typography variant="body2">{ props.text }</Typography> } />
        </ListItemButton>
    );
}

export default ItemCollapse;