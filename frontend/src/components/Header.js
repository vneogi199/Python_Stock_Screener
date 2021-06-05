import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

const Header = ({ title }) => {
	const classes = useStyles();
	const [darkState, setDarkState] = useState(false);
	const palletType = darkState ? 'dark' : 'light';
	const darkTheme = createMuiTheme({
		palette: {
			type: palletType
		}
	});
	const handleThemeChange = () => {
		setDarkState(!darkState);
	};
	return (
		<header>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					/>
					<Typography variant="h6" className={classes.title}>
						{title}
					</Typography>
					<ThemeProvider theme={darkTheme}>
						<Typography variant="h6">Dark Mode</Typography>
						<Switch checked={darkState} onChange={handleThemeChange} />
					</ThemeProvider>
				</Toolbar>
			</AppBar>
		</header>
	);
};

Header.defaultProps = {
	title: 'App Title'
};

Header.propTypes = {
	title: PropTypes.string
};

export default Header;
