export default [
  {
    uuid: '00000000-0000-0000-0000-000000000000',
    urlGlob: '*://www.google.com/*',
    rules: [
      {
        query: 'google',
        replaceString: 'doogle',
        isUsingRegex: false,
        isCaseSensitive: true,
      },
      {
        query: 'search',
        replaceString: 'birch',
        isUsingRegex: false,
        isCaseSensitive: true,
      },
    ],
  },
  {
    uuid: '11111111-1111-1111-1111-111111111111',
    urlGlob: '**rocketfusiondev**',
    rules: [
      {
        query: 'a',
        replaceString: 'o',
        isUsingRegex: false,
        isCaseSensitive: true,
      },
    ],
  },
];
