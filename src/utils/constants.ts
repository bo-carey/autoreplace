export enum EventType {
  POPUP_MOUNTED = 'popup-mounted',
  REPLACE = 'replace',
  SAVE = 'save',
}

export interface SearchResult {
  count: number;
  active: number;
}

export type Payload = Mutation[] | SiteSettings | null;

export interface EventMessage {
  type: string;
  payload: Payload;
}

export type EventMessageReturnType = SiteSettings | void | null;

export interface Mutation {
  query: string;
  replaceString: string;
  isUsingRegex: boolean;
  isCaseSensitive: boolean;
}

export interface SiteSettings {
  uuid: string;
  urlGlob: string;
  rules: Mutation[];
}

export interface SiteKey {
  uuid: string;
  urlGlob: string;
}

export interface Messenger {
  getSiteSettings: () => Promise<SiteSettings>;
  send: (type: EventType, payload?: Payload) => Promise<EventMessageReturnType>;
}
