import { browser } from 'webextension-polyfill-ts';
import { EventType } from './constants';

const handleMessage = (message: any): Promise<any | null> => {
  return new Promise((resolve, reject) => {
    const { eventType } = message;
    switch (eventType) {
      case EventType.POPUP_MOUNTED:
        console.log('backgroundPage notified that Popup.tsx has mounted.');
        browser.tabs.executeScript({
          file: './contentScript.js',
        });
        break;
      case EventType.SEARCH:
        console.log('seach query', message.query);
        break;
      default:
        console.log('Recieved unknown message: ', message);
    }
  });
};

browser.runtime.onMessage.addListener(handleMessage);
