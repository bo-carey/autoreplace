import { browser } from 'webextension-polyfill-ts';
import { EventType, EventMessage, Rule } from '../utils/constants';
import storage from '../utils/storage';

let allTextNodes: Element[] = [];

const getTextNodes = (el: Element = document.body): Element[] => {
  let node;
  const textNodes = [];
  const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  while ((node = treeWalker.nextNode())) textNodes.push(node as Element);
  return textNodes;
};

const replaceText = (Rules: Rule[]) => {
  Rules.forEach((pair) => {
    const { query, replaceString } = pair;
    const regexQuery = new RegExp(query, 'g');

    for (let i = 0; i < allTextNodes.length; i++) {
      const node = allTextNodes[i];
      const currentValue = node.textContent || null;
      const newValue = node.textContent?.replace(regexQuery, replaceString) || null;
      if (currentValue && newValue && currentValue !== newValue) {
        node.textContent = newValue;
      }
    }
  });
};

const handleMessage = (message: EventMessage): Promise<any> | void => {
  switch (message.type) {
    case EventType.POPUP_MOUNTED:
      console.log('backgroundPage notified that Popup.tsx has mounted.');
      return Promise.resolve();
    case EventType.SEARCH:
      console.log('seach query', message.payload);
      // return findInDocument(message.payload);
      return replaceText(message.payload as Rule[]);
    default:
      console.log('Recieved unknown message: ', message.payload);
  }
};

browser.runtime.onMessage.addListener(handleMessage);

allTextNodes = getTextNodes();

const createMockData = async (): Promise<void> => {
  await storage.setSiteSettings({
    uuid: '00000000-0000-0000-0000-000000000000',
    urlGlob: '*://www.google.com/*',
    rules: [
      {
        query: 'o',
        replaceString: 'e',
      },
    ],
  });
  await storage.setSiteSettings({
    uuid: '11111111-1111-1111-1111-111111111111',
    urlGlob: '**rocketfusiondev**',
    rules: [
      {
        query: 'a',
        replaceString: 'o',
      },
    ],
  });
  return;
};

createMockData();

const runReplacer = async () => {
  const siteSettings = await storage.getSiteSettings();
  replaceText(siteSettings?.rules || []);
};

window.addEventListener('onload', () => runReplacer());
