import os

import pandas as pd

from common.stock_names import stock_names
from downloader.downloader import download_historical_data
from screener.returns_data import generate_returns_data
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/stock_names")
def get_stock_names():
    return stock_names


@app.post("/data")
def main(stocks: tuple):
    if not os.path.isfile('data.csv'):
        download_historical_data()
    # TODO: check if today's data exists and append today's data if not exists
    symbols = [stock['symbol'] for stock in stocks];
    stock_names = [stock['names'] for stock in stocks];
    data = pd.read_csv('data.csv', index_col=0, usecols=symbols)
    data.index = pd.to_datetime(data.index)
    data = data.apply(pd.to_numeric)  # convert all columns of DataFrame
    return generate_returns_data(data)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
