import matplotlib.pyplot as plt
import pandas as pd

from common.stock_names import stock_names
import numpy as np


def generate_returns_data(data: pd.DataFrame):
    monthly_price_data = data.groupby([data.index.year, data.index.month]).tail(1)
    monthly_returns = monthly_price_data.pct_change()[1:]
    std_dev: pd.DataFrame = monthly_returns.rolling(36).std()
    return std_dev.replace({np.nan: None})
