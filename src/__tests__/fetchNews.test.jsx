const { fetchNews } = require('@/utils/fetchNews');

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ articles: [{ title: 'Test Article' }] }),
  })
);

test('fetchNews returns articles on success', async () => {
  const data = await fetchNews('top-headlines?country=us');
  expect(data.articles).toHaveLength(1);
  expect(data.articles[0].title).toBe('Test Article');
});
