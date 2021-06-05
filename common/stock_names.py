import pandas as pd

scraped_table = pd.read_html('https://en.wikipedia.org/wiki/NIFTY_50#Constituents')[1]
scraped_table = scraped_table[['Symbol', 'Company Name']]
scraped_table.columns = ['symbol', 'name']
stock_names = scraped_table.to_dict(orient="records")
stock_names.extend(
    ({'symbol': "^NSEI", 'name': "Nifty 50"},
     {'symbol': "ICICILOVOL.NS", 'name': "ICICI Low Volatility ETF"},
     {'symbol': "^GSPC", 'name': "S&P 500"},
     {'symbol': "GOLDBEES.NS", 'name': "GoldBees"},
     {'symbol': "^NDX", 'name': "NASDAQ 100"}
     ))
stock_names.sort(key=lambda x: x['name'])
for idx, stock in enumerate(stock_names):
    stock['id'] = idx
