// src/__tests__/Home.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ articles: [{ title: 'Headline', description: 'desc' }] }),
  })
);

test('renders headlines and handles search input', async () => {
  render(<Home />);
  expect(screen.getByPlaceholderText(/search top headlines/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('Headline')).toBeInTheDocument());

  fireEvent.change(screen.getByPlaceholderText(/search top headlines/i), {
    target: { value: 'sports' },
  });
  expect(screen.getByDisplayValue('sports')).toBeInTheDocument();
});
