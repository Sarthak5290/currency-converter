import React, { useState, useEffect } from "react";
import axios from "axios";
import { currencies } from "./currencies.js"; 
import switchIcon from "../images/switchImage.png"; 

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
    <div className={`max-w-md mx-auto p-6 bg-gradient-to-br from-blue-900 to-indigo-900 text-white shadow-2xl rounded-2xl space-y-6 mt-8 transition-all duration-1000 ease-in-out ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h1 className="text-4xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
        Currency Converter
      </h1>

      <div className="space-y-5">
        <div>
          <label htmlFor="fromAmount" className="block text-lg font-semibold mb-2 text-blue-200">Amount:</label>
          <input
            id="fromAmount"
            type="text"
            value={formatCurrencyInput(fromCurrency, amount)}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="w-full px-4 py-3 bg-gray-800 border-2 border-blue-700 rounded-xl text-white focus:ring-4 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2 text-blue-200">From:</label>
          <div className="relative">
            <div 
              onClick={() => setShowFromDropdown(!showFromDropdown)} 
              className="flex items-center bg-gray-800 rounded-xl p-3 cursor-pointer hover:bg-gray-700 transition duration-200 border-2 border-transparent hover:border-blue-600"
            >
              <img 
                src={getFlagUrl(fromCurrency)} 
                alt={fromCurrency} 
                className="w-10 h-10 object-cover rounded-full mr-3 shadow-md" 
              />
              <span className="font-medium">
                {currencies.find((c) => c.code === fromCurrency).name} ({fromCurrency})
              </span>
            </div>
            {showFromDropdown && (
              <ul className="absolute z-20 bg-gray-800 rounded-xl shadow-2xl mt-2 w-full max-h-64 overflow-y-auto border border-blue-700">
                {currencies.map((currency) => (
                  <li
                    key={currency.code}
                    onClick={() => {
                      setFromCurrency(currency.code);
                      setShowFromDropdown(false);
                    }}
                    className="flex items-center p-3 hover:bg-blue-900 cursor-pointer transition duration-150"
                  >
                    <img 
                      src={getFlagUrl(currency.code)} 
                      alt={currency.code} 
                      className="inline-block w-6 h-6 mr-3 rounded-full" 
                    />
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
            className="p-3 bg-blue-700 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:rotate-180 hover:scale-110 shadow-lg"
          >
            <img src={switchIcon} alt="Switch" className="w-6 h-6" />
          </button>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2 text-blue-200">To:</label>
          <div className="relative">
            <div 
              onClick={() => setShowToDropdown(!showToDropdown)} 
              className="flex items-center bg-gray-800 rounded-xl p-3 cursor-pointer hover:bg-gray-700 transition duration-200 border-2 border-transparent hover:border-blue-600"
            >
              <img 
                src={getFlagUrl(toCurrency)} 
                alt={toCurrency} 
                className="w-10 h-10 object-cover rounded-full mr-3 shadow-md" 
              />
              <span className="font-medium">
                {currencies.find((c) => c.code === toCurrency).name} ({toCurrency})
              </span>
            </div>
            {showToDropdown && (
              <ul className="absolute z-20 bg-gray-800 rounded-xl shadow-2xl mt-2 w-full max-h-64 overflow-y-auto border border-blue-700">
                {currencies.map((currency) => (
                  <li
                    key={currency.code}
                    onClick={() => {
                      setToCurrency(currency.code);
                      setShowToDropdown(false);
                    }}
                    className="flex items-center p-3 hover:bg-blue-900 cursor-pointer transition duration-150"
                  >
                    <img 
                      src={getFlagUrl(currency.code)} 
                      alt={currency.code} 
                      className="inline-block w-6 h-6 mr-3 rounded-full" 
                    />
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
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        Convert
      </button>

      <div className="text-center">
        {loading && (
          <p className="text-blue-300 animate-pulse">
            Converting...
          </p>
        )}
        {error && (
          <p className="text-red-400 font-semibold animate-bounce">
            {error}
          </p>
        )}
        {convertedAmount && (
          <h2 className="text-3xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
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