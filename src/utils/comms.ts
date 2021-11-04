import { browser, Tabs } from 'webextension-polyfill-ts';
import { EventType, Messenger, Payload, EventMessageReturnType } from './constants';

export const messengerFactory = async (): Promise<Messenger> => {
  const tabs: Tabs.Tab[] = await browser.tabs.query({ active: true, currentWindow: true });
  const activeTabId = tabs[0].id || 0;
  const send = (type: EventType, payload?: Payload): Promise<EventMessageReturnType> => {
    return browser.tabs.sendMessage(activeTabId, { type, payload });
  };
  return {
    send,
  };
};
