import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		justifyContent: 'center',
		display: 'flex'
	},
	searchField: {
		display: 'flex',
		justifyContent: 'center',
		'& > *': {
			margin: theme.spacing(1),
			width: '85%'
		}
	},
	formControl: {
		margin: theme.spacing(3),
		width: 500
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: 2
	},
	items: {
		margin: 10
	}
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

const Selector = ({ selectorOptions, onSelectionChange }) => {
	const classes = useStyles();
	const [selectedStocks, setSelectedStocks] = useState([]);
	const [displayedStocks, setDisplayedStocks] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const handleChange = (stockObj, isChecked) => {
		if (isChecked) {
			setSelectedStocks([...selectedStocks, stockObj]);
		} else {
			setSelectedStocks(
				selectedStocks.filter((stock) => stock.id !== stockObj.id)
			);
		}
	};
	const searchChange = (userInput) => {
		setSearchInput(userInput);
		if (userInput.length > 0) {
			setDisplayedStocks(
				selectorOptions.filter((stock) =>
					stock.name.toLowerCase().includes(userInput.toLowerCase())
				)
			);
		} else {
			setDisplayedStocks(selectorOptions);
		}
	};
	useEffect(() => {
		setDisplayedStocks(selectorOptions);
	}, [selectorOptions]);
	useEffect(() => {
		onSelectionChange(selectedStocks);
	}, [selectedStocks]);

	return (
		<div className={classes.root}>
			<FormControl component="fieldset" className={classes.formControl}>
				<FormLabel component="legend">
					Select Stocks and ETFs to compare
				</FormLabel>
				<FormGroup>
					<Select
						multiple
						value={selectedStocks}
						input={<Input id="select-multiple-chip" />}
						renderValue={(selected) => (
							<div className={classes.chips}>
								{selected.map((value) => (
									<Chip
										key={value}
										label={value.name}
										className={classes.chip}
									/>
								))}
							</div>
						)}
						MenuProps={MenuProps}
					>
						<div className={classes.searchField}>
							<TextField
								label="Search"
								variant="outlined"
								value={searchInput}
								onChange={(e) => searchChange(e.target.value)}
							/>
						</div>
						{displayedStocks.map((option) => (
							<span className={classes.items} key={option.id}>
								<FormControlLabel
									key={option}
									control={
										<Checkbox
											checked={selectedStocks.includes(option)}
											onChange={(e) => handleChange(option, e.target.checked)}
										/>
									}
									label={option.name}
								/>
								<br />
							</span>
						))}
					</Select>
				</FormGroup>
			</FormControl>
		</div>
	);
};

Selector.defaultProps = {
	selectorOptions: []
};

Selector.propTypes = {
	selectorOptions: PropTypes.arrayOf(PropTypes.object),
	onSelectionChange: PropTypes.func.isRequired
};

export default Selector;
