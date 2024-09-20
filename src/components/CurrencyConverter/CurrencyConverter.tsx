import React, { useState, useEffect } from 'react';
import { getCurrencyRates } from '../../services/api';
import styles from './CurrencyConverter.module.css';

interface Currency {
  code: string;
  currency: string;
  mid: number;
}

const CurrencyConverter: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState('THB');
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(0);
  const [isPLNtoCurrency, setIsPLNtoCurrency] = useState(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await getCurrencyRates();
        if (data) {
          setCurrencies(data?.rates || []);
        }
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConversion = () => {
    const selected = currencies.find((currency) => currency.code === selectedCurrency);
    if (selected) {
      if (isPLNtoCurrency) {
        setConverted(amount / selected.mid);
      } else {
        setConverted(amount * selected.mid);
      }
    }
  };

  const toggleConversionDirection = () => {
    setIsPLNtoCurrency(!isPLNtoCurrency);
  };

  useEffect(() => {
    handleConversion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPLNtoCurrency, selectedCurrency, amount, currencies]);

  return (
    <div className={styles.currencyConverterContainer}>
      <h2>Kalkulator walutowy</h2>
      <div className={styles.currencyConverterForm}>
        <input
          min={0}
          type="number"
          value={amount}
          onChange={({ target: { value } }) => setAmount(Number(value))}
          className={styles.currencyConverterInput}
        />
        <select
          value={selectedCurrency}
          onChange={({ target: { value } }) => setSelectedCurrency(value)}
          className={styles.currencyConverterSelect}>
          {currencies.map(({ code }) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>

        <div className={styles.switchContainer}>
          <label data-testid="switch-label" className={styles.switchLabel}>
            {isPLNtoCurrency ? `PLN → ${selectedCurrency}` : `${selectedCurrency} → PLN`}
          </label>
          <button data-testid="switch-btn" onClick={toggleConversionDirection} className={styles.switchButton}>
            ↔️
          </button>
        </div>

        <button data-testid="convert-btn" onClick={handleConversion} className={styles.currencyConverterButton}>
          Konwertuj
        </button>
      </div>
      <p data-testid="convert-result" className={styles.currencyConverterResult}>
        Wynik: {converted.toFixed(2)} {isPLNtoCurrency ? selectedCurrency : 'PLN'}
      </p>
    </div>
  );
};

export default CurrencyConverter;
