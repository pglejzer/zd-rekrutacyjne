import React, { useEffect, useState } from 'react';
import { getCurrencyHistory } from '../../services/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
} from 'recharts';
import { CurrencyTrendsProps, Rate } from './CurrencyTrends.types';
import { generateDate } from '../../utils/date';
import { WarningInfo } from '../WarningInfo/WarningInfo';
import ChartTypeSelector from './ChartTypeSelector/ChartTypeSelector';
import styles from './CurrencyTrends.module.css';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className="label">{payload[0].value}</p>
        <p className={styles.customTooltipDesc}>średnia: {payload[0].payload.mid}</p>
      </div>
    );
  }
  return null;
};

const CurrencyTrends: React.FC<CurrencyTrendsProps> = ({ code }) => {
  const [history, setHistory] = useState<Rate[]>([]);
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [chartType, setChartType] = useState('line');
  const [errorInfo, setErrorInfo] = useState('');

  useEffect(() => {
    const { endDateFormatted, startDateFormatted } = generateDate();
    setEndDate(endDateFormatted);
    setStartDate(startDateFormatted);
  }, []);

  const fetchHistory = async () => {
    if (!endDate || !startDate) return;
    try {
      const data = await getCurrencyHistory(code, startDate, endDate);

      if (data.rates && data.rates.length) {
        setHistory(data.rates.map((value) => ({ ...value, średnia: value.mid })));
        setErrorInfo('');
      } else if (data.info) {
        setErrorInfo(data.info);
        setHistory([]);
      }
    } catch (error) {
      console.error('Error fetching currency history:', error);
      setErrorInfo('Nie udało się pobrać danych.');
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, startDate, endDate]);

  const handleDateChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const renderChart = () => {
    const commonElements = (
      <>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="effectiveDate" />
        <YAxis />
        <Tooltip />
        <Legend />
      </>
    );

    if (chartType === 'line') {
      return (
        <LineChart data={history}>
          {commonElements}
          <Line type="monotone" dataKey="średnia" stroke="#40a9ff" />
        </LineChart>
      );
    }

    if (chartType === 'bar') {
      return (
        <BarChart data={history}>
          {commonElements}
          <Bar dataKey="średnia" fill="#40a9ff" />
        </BarChart>
      );
    }

    if (chartType === 'dot') {
      return (
        <ScatterChart data={history}>
          <Tooltip content={<CustomTooltip />} />
          {commonElements}
          <Scatter dataKey="średnia" fill="#40a9ff" />
        </ScatterChart>
      );
    }
    return <></>;
  };

  return (
    <div className={styles.CurrencyTrendsContainer}>
      <h2 data-testid="header2-tag">Wykres kursu waluty {code}</h2>

      <div className={styles.dateSelector}>
        <div>
          <label className={styles.dateSelecorStartLabel}>
            <span className={styles.dateSelectorDateLabel} data-testid="start-date-label">
              Data początkowa:
            </span>
            <input
              data-testid="start-date-input"
              type="date"
              value={startDate}
              onChange={handleDateChange(setStartDate)}
            />
          </label>
          <label className={styles.dateSelecorEndLabel}>
            <span className={styles.dateSelectorDateLabel} data-testid="end-date-label">
              Data końcowa:
            </span>
            <input data-testid="end-date-input" type="date" value={endDate} onChange={handleDateChange(setEndDate)} />
          </label>
        </div>

        <ChartTypeSelector chartType={chartType} setChartType={setChartType} />
      </div>
      <WarningInfo info={errorInfo} />

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CurrencyTrends;
