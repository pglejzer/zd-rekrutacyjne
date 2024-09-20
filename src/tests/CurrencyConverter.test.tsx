import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyConverter from '../components/CurrencyConverter/CurrencyConverter';
import { getCurrencyRates } from '../services/api';

jest.mock('../services/api', () => ({
  getCurrencyRates: jest.fn(),
}));

const mockRates = [
  { code: 'USD', currency: 'US Dollar', mid: 3.8 },
  { code: 'THB', currency: 'Thai Baht', mid: 0.115 },
];

describe('CurrencyConverter', () => {
  beforeEach(() => {
    (getCurrencyRates as jest.Mock).mockResolvedValue({ rates: mockRates });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', async () => {
    render(<CurrencyConverter />);

    await waitFor(() => {
      expect(screen.getByText('Kalkulator walutowy')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('THB')).toBeInTheDocument();
      expect(screen.getByText('PLN → THB')).toBeInTheDocument();
    });
  });

  test('can change amount input', async () => {
    render(<CurrencyConverter />);

    const amountInput = await screen.findByDisplayValue('1');
    fireEvent.change(amountInput, { target: { value: '100' } });

    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
  });

  test('converts PLN to THB correctly and THB to PLN', async () => {
    render(<CurrencyConverter />);

    const convertButton = screen.getByTestId('convert-btn');
    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(screen.getByTestId('convert-result')).toHaveTextContent('Wynik: 8.70 THB');
    });

    const switchButton = screen.getByTestId('switch-btn');
    fireEvent.click(switchButton);

    expect(screen.getByTestId('switch-label')).toBeInTheDocument();

    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(screen.getByTestId('convert-result')).toHaveTextContent('Wynik: 0.12 PLN');
    });
  });
});
