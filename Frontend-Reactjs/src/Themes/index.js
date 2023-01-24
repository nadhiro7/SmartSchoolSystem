import { createTheme } from '@mui/material/styles';

// assets
import colors from './../assets/scss/colors.scss';
import colorLogin from './../assets/scss/colorLogin.scss';
import colorSignup from './../assets/scss/colorSignup.scss';
import darkColors from './../assets/scss/darkColors.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';
/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = ( mode ) =>
{
    const color = colors;
    const darkColor = darkColors;
    const themeLightOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
    };
    const themeDarkOption = {
        colors: darkColor,
        heading: darkColor.grey50,
        paper: darkColor.darkPaper,
        backgroundDefault: darkColor.darkBackground,
        background: darkColor.darkLevel2,
        darkTextPrimary: darkColor.grey100,
        darkTextSecondary: darkColor.grey300,
        textDark: darkColor.grey50,
        menuSelected: darkColor.secondaryDark,
        menuSelectedBack: darkColor.secondaryLight,
        divider: darkColor.grey600,
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette( mode === 'light' ? themeLightOption : themeDarkOption ),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography( mode === 'light' ? themeLightOption : themeDarkOption )
    };

    const themes = createTheme( themeOptions );
    themes.components = componentStyleOverrides( mode === 'light' ? themeLightOption : themeDarkOption );

    return themes;
};
export const themeLogin = () =>
{
    const color = colorLogin;

    const themeLightOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette( themeLightOption ),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography( themeLightOption )
    };

    const themes = createTheme( themeOptions );
    themes.components = componentStyleOverrides( themeLightOption );

    return themes;
};
export const themeSignup = () =>
{
    const color = colorSignup;

    const themeLightOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette( themeLightOption ),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography( themeLightOption )
    };

    const themes = createTheme( themeOptions );
    themes.components = componentStyleOverrides( themeLightOption );

    return themes;
};

