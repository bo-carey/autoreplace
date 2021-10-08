import { browser, Tabs } from 'webextension-polyfill-ts';
import { EventType } from './constants';

export const sendMessage = (type: EventType, payload: Record<string, any> = {}): void => {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs: Tabs.Tab[]) => {
    const activeTabId = tabs[0].id || 0;
    browser.tabs.sendMessage(activeTabId, { type, payload });
  });
};
