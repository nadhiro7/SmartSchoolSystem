import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from './..//MainCard';

// styles
const CardWrapper = styled( MainCard )( ( { theme } ) => ( {
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${ theme.palette.warning.dark } -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${ theme.palette.warning.dark } -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
} ) );

// ==============================|| DASHBOARD - Card 3 ||============================== //

const AdminCard3 = ( props ) =>
{
    const theme = useTheme();

    return (
        <CardWrapper border={ false } content={ false }>
            <Box sx={ { p: 2 } }>
                <List sx={ { py: 0 } }>
                    <ListItem alignItems="center" disableGutters sx={ { py: 0 } }>
                        <ListItemText
                            sx={ {
                                py: 0,
                                mt: 0.45,
                                mb: 0.45
                            } }
                            primary={ <Typography variant="h4">{ props.total }</Typography> }
                            secondary={
                                <Typography
                                    variant="subtitle2"
                                    sx={ {
                                        color: theme.palette.text.secondary,
                                        mt: 0.5
                                    } }
                                >
                                    Total { props.text }
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </Box>
        </CardWrapper>
    );
};


export default AdminCard3;
