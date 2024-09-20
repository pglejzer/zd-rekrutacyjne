import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyList from '../components/CurrencyList/CurrencyList';
import { getCurrencyRates } from '../services/api';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../services/api', () => ({
  getCurrencyRates: jest.fn(),
}));

const mockRates = [
  { code: 'USD', currency: 'US Dollar', mid: 3.8 },
  { code: 'THB', currency: 'Thai Baht', mid: 0.115 },
  { code: 'EUR', currency: 'Euro', mid: 4.2 },
  { code: 'GBP', currency: 'British Pound', mid: 5.1 },
  { code: 'JPY', currency: 'Japanese Yen', mid: 0.03 },
];

describe('CurrencyList', () => {
  beforeEach(() => {
    (getCurrencyRates as jest.Mock).mockResolvedValue({ rates: mockRates, date: '2023-09-15', info: '' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the correct elements', async () => {
    render(
      <BrowserRouter>
        <CurrencyList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('header-tag')).toBeInTheDocument();
      expect(screen.getByTestId('header-tag')).toHaveTextContent('Lista kursów walut z dnia 15.09.2023');
    });
  });

  test('displays the currency rates', async () => {
    render(
      <BrowserRouter>
        <CurrencyList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('US Dollar')).toBeInTheDocument();
      expect(screen.getByText('THB')).toBeInTheDocument();
      expect(screen.getByText('Euro')).toBeInTheDocument();
    });
  });

  test('allows the user to search for currencies', async () => {
    render(
      <BrowserRouter>
        <CurrencyList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('US Dollar')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Szukaj waluty lub kodu');
    fireEvent.change(searchInput, { target: { value: 'Euro' } });

    expect(screen.queryByText('US Dollar')).not.toBeInTheDocument();
    expect(screen.getByText('Euro')).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    (getCurrencyRates as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(
      <BrowserRouter>
        <CurrencyList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Błąd podczas pobierania danych')).toBeInTheDocument();
    });
  });

  test('displays "Pokaż więcej" button if more than 10 currencies exist', async () => {
    const moreMockRates = Array(15).fill({ code: 'USD', currency: 'US Dollar', mid: 3.8 });
    (getCurrencyRates as jest.Mock).mockResolvedValue({ rates: moreMockRates, date: '2023-09-15', info: '' });

    render(
      <BrowserRouter>
        <CurrencyList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Pokaż więcej')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Pokaż więcej'));
    expect(screen.getByText('Pokaż mniej')).toBeInTheDocument();
  });
});
