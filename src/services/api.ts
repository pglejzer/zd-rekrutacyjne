import { CurrencyRate, CurrencyRatesResponse } from './api.types';

const API_BASE_URL = 'https://api.nbp.pl/api/exchangerates';

export const getCurrencyRates = async (date?: string): Promise<CurrencyRatesResponse> => {
  try {
    const url = `${API_BASE_URL}/tables/A/${date ? date + '/' : ''}?format=json`;

    const response = await fetch(url);

    if (response.status === 404 || response.status === 400) {
      const latestResponse = await fetch(`${API_BASE_URL}/tables/A?format=json`);

      if (!latestResponse.ok) {
        throw new Error('Network response was not ok for latest available data');
      }

      const latestData = await latestResponse.json();

      return {
        rates: latestData[0].rates,
        date: latestData[0].effectiveDate,
        info: `Dane nie zostały znalezione dla daty: ${date}. Zwrócono najnowsze dostępne dane.`,
      };
    }

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return {
      rates: data[0].rates,
      date: data[0].effectiveDate,
    };
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    throw error;
  }
};

export const getCurrencyHistory = async (code: string, startDate: string, endDate: string): Promise<CurrencyRate> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rates/A/${code}/${startDate}/${endDate}/?format=json`);

    if (response.status === 404 || response.status === 400) {
      return {
        rates: [],
        info: `Dane nie zostały znalezione dla przedziału dat ${startDate} - ${endDate}. Proszę wybrać inny przedział.`,
      };
    }

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { rates: data.rates };
  } catch (error) {
    console.error('Error fetching currency history:', error);
    throw error;
  }
};
