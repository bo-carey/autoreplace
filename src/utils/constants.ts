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
  payload: PayloadObject | Rule[] | null;
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

export interface Rule {
  query: string;
  replaceString: string;
}

export interface SiteSettings {
  uuid: string;
  urlGlob: string;
  rules: Rule[];
}

export interface SiteKey {
  uuid: string;
  urlGlob: string;
}
