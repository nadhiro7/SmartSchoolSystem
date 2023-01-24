import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography, Chip } from '@mui/material';

// project imports
import MainCard from '../MainCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const CardWrapper = styled( MainCard )( ( { theme } ) => ( {
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[ 800 ],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [ theme.breakpoints.down( 'sm' ) ]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[ 800 ],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [ theme.breakpoints.down( 'sm' ) ]: {
            top: -155,
            right: -70
        }
    }
} ) );

// ===========================|| DASHBOARD DEFAULT - CARD1 ||=========================== //

const AdminCard1 = ( props ) =>
{
    const theme = useTheme();
    const chipSX = {
        height: 20,
        padding: '0 6px'
    };
    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: 20,
        mr: 1
    };
    return (

        <CardWrapper border={ false } content={ false }>
            <Box sx={ { p: 2.25 } }>
                <Grid container direction="column">
                    <Grid item>
                        <Typography sx={ { fontSize: '1.5rem', fontWeight: 500 } }>
                            { props.title }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Typography sx={ { fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.25, mb: 0.75 } }>
                                    { props.number }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={ { mb: 1.25 } } flexDirection='row'>
                        <Grid container>
                            <Grid item>
                                <Typography
                                    sx={ {
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        color: theme.palette.secondary[ 200 ]
                                    } }
                                >
                                    { props.newTitle }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </CardWrapper>
    );
};

AdminCard1.propTypes = {
    isLoading: PropTypes.bool
};

export default AdminCard1;
