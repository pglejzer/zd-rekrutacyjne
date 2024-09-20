import React from 'react';
import { ChartTypeSelectorProps } from './ChartTypeSelector.types';
import styles from './ChartTypeSelector.module.css';

const chartOptions = [
  { value: 'line', label: 'Wykres liniowy' },
  { value: 'bar', label: 'Wykres słupkowy' },
  { value: 'dot', label: 'Wykres kropkowy' },
];

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({ chartType, setChartType }) => (
  <div className={styles.chartWrapper}>
    {chartOptions.map(({ value, label }) => (
      <label key={value} className={styles.chartWrapperLabel}>
        <input type="radio" value={value} checked={chartType === value} onChange={() => setChartType(value)} />
        {label}
      </label>
    ))}
  </div>
);

export default ChartTypeSelector;
