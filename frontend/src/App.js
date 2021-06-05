import { useState, useEffect } from 'react';
import Header from './components/Header';
import Selector from './components/Selector';

function App() {
	const appName = 'Stock Screener';
	const [stockNames, setStockNames] = useState([]);
	const [selectedStockNames, setSelectedStockNames] = useState([]);
	const [stockData, setStockData] = useState([]);
	const onSelectionChange = (stocks) => setSelectedStockNames(stocks);
	const fetchStockNames = async () => {
		const res = await fetch('http://localhost:8000/stock_names');
		return res.json();
	};
	const fetchStockData = async () => {
		const res = await fetch('http://localhost:8000/data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(selectedStockNames)
		});
		return res.json();
	};

	useEffect(() => {
		const getStockNames = async () => {
			const stockNamesFromServer = await fetchStockNames();
			setStockNames(stockNamesFromServer);
		};
		getStockNames();
	}, []);

	useEffect(() => {
		const getStockData = async () => {
			const stockDataFromServer = await fetchStockData();
			setStockData(stockDataFromServer);
		};
		getStockData();
	}, [selectedStockNames]);

	return (
		<div>
			<Header title={appName} />
			<Selector
				selectorOptions={stockNames}
				onSelectionChange={onSelectionChange}
			/>
		</div>
	);
}

export default App;
