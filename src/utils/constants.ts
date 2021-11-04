export enum EventType {
  POPUP_MOUNTED = 'popup-mounted',
  REPLACE = 'replace',
  SAVE = 'save',
}

export interface SearchResult {
  count: number;
  active: number;
}

export type Payload = Rule[] | SiteSettings | null;

export interface EventMessage {
  type: string;
  payload: Payload;
}

export type EventMessageReturnType = SiteSettings | void | null;

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

export interface Messenger {
  send: (type: EventType, payload?: Payload) => Promise<EventMessageReturnType>;
}
