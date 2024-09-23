import React, { useState, useEffect } from "react";
import axios from "axios";
import { currencies } from "./currencies.js"; // Ensure this file has your currencies data
import switchIcon from "../images/switchImage.png"; // Adjust the path to your switch icon

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
  }, []);

  const getFlagUrl = (currencyCode) => {
    const selectedCurrency = currencies.find((currency) => currency.code === currencyCode);
    return `https://flagsapi.com/${selectedCurrency.countryCode}/flat/32.png`;
  };

  const getCurrencySymbol = (currencyCode) => {
    const selectedCurrency = currencies.find((currency) => currency.code === currencyCode);
    return selectedCurrency ? selectedCurrency.symbol : "";
  };

  const formatCurrencyInput = (currencyCode, value) => {
    const symbol = getCurrencySymbol(currencyCode);
    return `${symbol} ${value}`;
  };

  const parseCurrencyInput = (value) => {
    return value.replace(/[^\d.-]/g, "");
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseCurrencyInput(inputValue);
    setAmount(numericValue);
  };

  const handleConvert = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/convert", {
        params: { from: fromCurrency, to: toCurrency, amount },
      });
      setConvertedAmount(response.data.convertedAmount);
    } catch (err) {
      setError("Error converting currency");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  return (
    <div className={`max-w-md mx-auto p-6 bg-gray-800 text-white shadow-xl rounded-xl space-y-6 mt-8 transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Currency Converter</h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="fromAmount" className="block text-lg font-medium mb-2">Amount:</label>
          <input
            id="fromAmount"
            type="text"
            value={formatCurrencyInput(fromCurrency, amount)}
            onChange={handleAmountChange}
            placeholder="Amount"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">From:</label>
          <div className="relative">
            <div onClick={() => setShowFromDropdown(!showFromDropdown)} className="flex items-center bg-gray-700 rounded-lg p-2 cursor-pointer">
              <img src={getFlagUrl(fromCurrency)} alt={fromCurrency} className="w-10 h-10 object-cover" />
              <span className="ml-2">{currencies.find((c) => c.code === fromCurrency).name} ({fromCurrency})</span>
            </div>
            {showFromDropdown && (
              <ul className="absolute z-10 bg-gray-800 rounded-lg shadow-lg mt-1 w-full max-h-60 overflow-y-auto">
                {currencies.map((currency) => (
                  <li
                    key={currency.code}
                    onClick={() => {
                      setFromCurrency(currency.code);
                      setShowFromDropdown(false);
                    }}
                    className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
                  >
                    <img src={getFlagUrl(currency.code)} alt={currency.code} className="inline-block w-5 h-5 mr-2" />
                    <span>{currency.name} ({currency.code}) {currency.symbol}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSwitchCurrencies}
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-transform duration-200 transform hover:rotate-180"
          >
            <img src={switchIcon} alt="Switch" className="w-6 h-6" />
          </button>
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">To:</label>
          <div className="relative">
            <div onClick={() => setShowToDropdown(!showToDropdown)} className="flex items-center bg-gray-700 rounded-lg p-2 cursor-pointer">
              <img src={getFlagUrl(toCurrency)} alt={toCurrency} className="w-10 h-10 object-cover" />
              <span className="ml-2">{currencies.find((c) => c.code === toCurrency).name} ({toCurrency})</span>
            </div>
            {showToDropdown && (
              <ul className="absolute z-10 bg-gray-800 rounded-lg shadow-lg mt-1 w-full max-h-60 overflow-y-auto">
                {currencies.map((currency) => (
                  <li
                    key={currency.code}
                    onClick={() => {
                      setToCurrency(currency.code);
                      setShowToDropdown(false);
                    }}
                    className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
                  >
                    <img src={getFlagUrl(currency.code)} alt={currency.code} className="inline-block w-5 h-5 mr-2" />
                    <span>{currency.name} ({currency.code}) {currency.symbol}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleConvert}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform transition-transform duration-200 hover:scale-105"
      >
        Convert
      </button>

      <div className="text-center">
        {loading && <p className="text-gray-400">Converting...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {convertedAmount && (
          <h2 className="text-2xl font-bold mt-4">
            {currencies.find((c) => c.code === fromCurrency)?.symbol}
            {amount} {fromCurrency} ={" "}
            {currencies.find((c) => c.code === toCurrency)?.symbol}
            {convertedAmount} {toCurrency}
          </h2>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
