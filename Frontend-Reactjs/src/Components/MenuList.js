import React from 'react';
import MenuItem from './MenuItem';
import MenuCollapse from './MenuCollapse';
import { List } from '@mui/material';

function MenuList ( props )
{
    return (
        <List
            sx={ {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            } }
        >
            {
                props.list.map( ( item, index ) => item.isCollapse ? <MenuCollapse drawerOpen={ props.drawerOpen } key={ index } item={ item } /> : <MenuItem text={ item.text } key={ index } isLogout={item.isLogout ? item.isLogout:false} icon={ item.icon } url={ item.url } /> )
            }
        </List>
    );
}

export default MenuList;