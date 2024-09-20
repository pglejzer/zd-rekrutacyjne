import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Currency } from '../../services/api.types';
import { getCurrencyRates } from '../../services/api';
import { getCurrentDateISO } from '../../utils/date';
import { WarningInfo } from '../WarningInfo/WarningInfo';
import styles from './CurrencyList.module.css';

const CurrencyList: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [effectiveDate, setEffectiveDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDateISO());
  const [showMore, setShowMore] = useState(false);
  const [info, setInfo] = useState('');

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCurrencyRates(selectedDate);
      if (data) {
        setEffectiveDate(data?.date || '');
        setCurrencies(data?.rates || []);
        setInfo(data?.info || '');
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  }, []);

  const filteredCurrencies = useMemo(
    () =>
      currencies.filter(
        ({ code, currency }) =>
          code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          currency.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [currencies, searchTerm]
  );

  const shouldShowMoreButton = useMemo(
    () => filteredCurrencies.length > 10 && !(searchTerm && filteredCurrencies.length < 10),
    [filteredCurrencies, searchTerm]
  );

  return (
    <div className={styles.currencyListContainer}>
      <div className={styles.searchContainer}>
        <div>
          <h1 data-testid="header-tag">Lista kursów walut z dnia {effectiveDate?.split('-').reverse().join('.')}</h1>
          <WarningInfo info={info} />
        </div>
        <div>
          <input
            type="text"
            placeholder="Szukaj waluty lub kodu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <input type="date" value={selectedDate} onChange={handleDateChange} className={styles.dateInput} />
        </div>
      </div>
      {isLoading ? (
        <div className={styles.loading}>Ładowanie danych...</div>
      ) : (
        <>
          {filteredCurrencies.length === 0 ? (
            <p className={styles.noResultsMessage}>
              {isError ? (
                'Błąd podczas pobierania danych'
              ) : (
                <>Nie znaleziono wyników dla wyszukiwania &quot;{searchTerm}&quot;</>
              )}
            </p>
          ) : (
            <>
              <table className={styles.currencyListTable}>
                <thead className={styles.currenctListHead}>
                  <tr>
                    <th>Waluta</th>
                    <th>Kod</th>
                    <th>Kurs średni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCurrencies.map(({ code, currency, mid }, index) => (
                    <tr
                      key={code}
                      className={`${!showMore && index >= 10 ? styles.hiddenRow : ''}`}
                      onClick={() => navigate(`/currency/${code}`)}>
                      <td>{currency}</td>
                      <td>{code}</td>
                      <td>{mid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {shouldShowMoreButton ? (
                <>
                  {!showMore && <div className={styles.fadeEffect} />}
                  {currencies.length > 10 && (
                    <button onClick={() => setShowMore(!showMore)} className={styles.showMoreButton}>
                      {showMore ? 'Pokaż mniej' : 'Pokaż więcej'}
                    </button>
                  )}
                </>
              ) : null}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CurrencyList;
