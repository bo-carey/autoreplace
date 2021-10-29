export enum EventType {
  POPUP_MOUNTED = 'popup-mounted',
  SEARCH = 'search',
}

export interface SearchResult {
  count: number;
  active: number;
}

export interface EventMessage {
  type: string;
  payload: PayloadObject | ReplacePair[] | null;
}

export interface PayloadObject {
  [key: string]: string | number | boolean;
}

export interface Search {
  id: string;
  query: string | RegExp;
  isCaseSensitive: boolean;
  isRegex: boolean;
}

export interface ReplacePair {
  query: string;
  replaceString: string;
}

const settings = [
  {
    uuid: '00000000-0000-0000-0000-000000000000',
    urlGlob: '*://www.google.com/*',
    rules: [
      {
        query: /regex/,
        replaceText: 'something',
      },
    ],
  },
];

export interface Rule {
  query: RegExp | string;
  replaceString: string;
}

export interface SiteSettings {
  uuid: string;
  urlGlob: string;
  rules: Rule[];
}
