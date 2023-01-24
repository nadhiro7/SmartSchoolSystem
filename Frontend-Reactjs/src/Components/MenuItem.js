import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
function MenuItem ( props )
{
    const navigate = useNavigate();
    const location = useLocation();
    const logout = ()=>{
        localStorage.clear();
        navigate('/login')
    }
    const theme = useTheme();
    return (
        <ListItemButton
            sx={ {
                borderRadius: `10px`,
                height: '40px',
                width: '95%',
                mb: '5px'
            } }
            onClick={ props.isLogout ? logout : () => navigate( props.url ) }
            selected={ `${ props.url }` === location.pathname.substring( 7 ) || `${ props.url }` === location.pathname.substring( 11 ) }
        >
            <ListItemIcon>
                { props.icon }
            </ListItemIcon>
            <ListItemText primary={ <Typography variant="body1">{ props.text }</Typography> } />
        </ListItemButton >
    );
}

export default MenuItem;