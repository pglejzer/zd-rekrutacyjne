import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyTrends from '../components/CurrencyTrends/CurrencyTrends';
import { getCurrencyHistory } from '../services/api';

jest.mock('../services/api', () => ({
  getCurrencyHistory: jest.fn(),
}));

const mockData = {
  rates: [
    { effectiveDate: '2024-01-01', mid: 4.0 },
    { effectiveDate: '2024-01-02', mid: 4.2 },
  ],
};

describe('CurrencyTrends', () => {
  beforeEach(() => {
    (getCurrencyHistory as jest.Mock).mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders radio btn with line text', async () => {
    render(<CurrencyTrends code="USD" />);

    expect(screen.getByTestId('header2-tag')).toHaveTextContent('Wykres kursu waluty USD');

    const lineChartRadio = screen.getByLabelText('Wykres liniowy');

    await waitFor(() => {
      expect(lineChartRadio).toBeInTheDocument();
    });
  });

  test('renders radio btn with bar text', async () => {
    render(<CurrencyTrends code="USD" />);

    const barChartRadio = screen.getByLabelText('Wykres słupkowy');

    await waitFor(() => {
      expect(barChartRadio).toBeInTheDocument();
    });
  });

  test('renders radio btn with scatter text', async () => {
    render(<CurrencyTrends code="USD" />);

    const scatterChartRadio = screen.getByLabelText('Wykres kropkowy');

    await waitFor(() => {
      expect(scatterChartRadio).toBeInTheDocument();
    });
  });

  test('displays error message when API call fails', async () => {
    (getCurrencyHistory as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<CurrencyTrends code="USD" />);

    await waitFor(() => {
      expect(screen.getByText('Nie udało się pobrać danych.')).toBeInTheDocument();
    });
  });

  test('displays info message if no data found', async () => {
    (getCurrencyHistory as jest.Mock).mockResolvedValue({ rates: [], info: 'Brak danych dla podanej daty.' });

    render(<CurrencyTrends code="USD" />);

    await waitFor(() => {
      expect(screen.getByText('Brak danych dla podanej daty.')).toBeInTheDocument();
    });
  });
});
