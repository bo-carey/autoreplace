import { browser } from 'webextension-polyfill-ts';
import { matchUrl } from '@bo-carey/urlglob';
import { EventType, EventMessage, ReplacePair } from '../utils/constants';

let allTextNodes: Element[] = [];

const getTextNodes = (el: Element = document.body): Element[] => {
  let node;
  const textNodes = [];
  const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  while ((node = treeWalker.nextNode())) textNodes.push(node as Element);
  return textNodes;
};

const replaceText = (replacePairs: ReplacePair[]) => {
  replacePairs.forEach((pair) => {
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
      return replaceText(message.payload as ReplacePair[]);
    default:
      console.log('Recieved unknown message: ', message.payload);
  }
};

browser.runtime.onMessage.addListener(handleMessage);

allTextNodes = getTextNodes();

const createMockData = async (): Promise<void> => {
  return browser.storage.sync.set({
    allKeys: [
      { uuid: '00000000-0000-0000-0000-000000000000', urlGlob: '*://www.google.com/*' },
      { uuid: '11111111-1111-1111-1111-111111111111', urlGlob: '**rocketfusiondev**' },
    ],
    '00000000-0000-0000-0000-000000000000': {
      uuid: '00000000-0000-0000-0000-000000000000',
      urlGlob: '*://www.google.com/*',
      rules: [
        {
          query: 'o',
          replaceString: 'e',
        },
      ],
    },
    '11111111-1111-1111-1111-111111111111': {
      uuid: '11111111-1111-1111-1111-111111111111',
      urlGlob: '**rocketfusiondev**',
      rules: [
        {
          query: 'a',
          replaceString: 'o',
        },
      ],
    },
  });
};

const getSiteSettings = async (location = window.location.href): Promise<any> => {
  let uuid = '';
  const allKeysData = await browser.storage.sync.get('allKeys');
  console.log(`allKeysData`, allKeysData);
  for (const keySet of allKeysData.allKeys) {
    console.log(`keySet`, keySet);
    if (matchUrl(location, keySet.urlGlob)) {
      uuid = keySet.uuid;
    }
  }
  if (!uuid || !uuid.length) return null;
  const { [uuid]: siteSettings } = await browser.storage.sync.get(uuid);
  if (siteSettings.uuid !== uuid) return;
  return siteSettings;
};

const testStorage = async () => {
  console.dir('testStorage');
  await createMockData();
  const siteSettings = await getSiteSettings();
  console.log(`siteSettings`, siteSettings);
  replaceText(siteSettings.rules);
};
testStorage();
