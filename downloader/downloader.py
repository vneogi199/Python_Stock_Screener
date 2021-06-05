import yfinance as yf

from common.stock_names import stock_names


def download_historical_data():
    data = yf.download(
        tickers=list(stock_names.keys()),
        start="2010-01-01",
        auto_adjust=True,
        prepost=True,
        threads=True,
        proxy=None
    )
    data['Close'].to_csv('data.csv')
