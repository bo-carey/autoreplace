export enum EventType {
  POPUP_MOUNTED = 'popup-mounted',
  SEARCH = 'search',
}

export interface SearchResult {
  count: number;
  active: number;
}
