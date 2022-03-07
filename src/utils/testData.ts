export default [
  {
    uuid: '00000000-0000-0000-0000-000000000000',
    urlGlob: '*://www.google.com/*',
    mutations: [
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
];
