import { browser, Tabs } from 'webextension-polyfill-ts';
import { EventType, Messenger, Payload, EventMessageReturnType, SiteSettings } from './constants';

export const messengerFactory = (activeTab: Tabs.Tab): Messenger => {
  const activeTabId = activeTab.id || 0;
  const getSiteSettings = async (): Promise<SiteSettings> => {
    return browser.tabs.sendMessage(activeTabId, { type: EventType.POPUP_MOUNTED });
  };
  const send = (type: EventType, payload?: Payload): Promise<EventMessageReturnType> => {
    return browser.tabs.sendMessage(activeTabId, { type, payload });
  };
  return {
    getSiteSettings,
    send,
  };
};
