import { render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';


describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testsCasesAmount = [
    { amount: '100', from: 'PLN', to: 'USD' },
    { amount: '20', from: 'USD', to: 'PLN' },
    { amount: '200', from: 'PLN', to: 'USD' },
    { amount: '345', from: 'USD', to: 'PLN' },
  ];


  for (const testObj of testsCasesAmount) {

    it('should render proper info about conversion', () => {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);

      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, testObj.from )} = `);
    });
  };

  const testNegativeCases = [
    { amount: -100, from: 'PLN', to: 'USD' },
    { amount: -20, from: 'USD', to: 'PLN' },
    { amount: -200, from: 'PLN', to: 'USD' },
    { amount: -345, from: 'USD', to: 'PLN' },
    { amount: -2, from: 'PLN', to: 'PLN' },
    { amount: -34, from: 'USD', to: 'USD' },
  ];

  for (const testObj of testNegativeCases) {
    it('should render "Wrong value..." when amount is negative', () => {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value..');

    });
  };
});