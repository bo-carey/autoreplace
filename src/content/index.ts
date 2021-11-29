import { browser } from 'webextension-polyfill-ts';
import { v4 as uuid } from 'uuid';
import {
  EventType,
  EventMessage,
  Mutation,
  SiteSettings,
  EventMessageReturnType,
} from '../utils/constants';
import storage from '../utils/storage';

let allTextNodes: Element[] = [];

const getTextNodes = (el: Element = document.body): Element[] => {
  const textNodes = [];
  const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  let node = treeWalker.nextNode();
  while (node) {
    textNodes.push(node as Element);
    node = treeWalker.nextNode();
  }
  return textNodes;
};

const replaceText = (mutations: Mutation[]) => {
  mutations.forEach((pair) => {
    const {
      query, replaceString, isCaseSensitive, isUsingRegex,
    } = pair;
    console.log('pair', pair);
    const regexQuery = new RegExp(query, `g${isCaseSensitive ? 'i' : ''}`);

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

const saveRules = async (settings: SiteSettings): Promise<void> => {
  const siteSettings = await storage.getSiteSettings();
  await storage.setSiteSettings({
    ...siteSettings,
    ...settings,
    uuid: siteSettings?.uuid || uuid(),
  });
};

const handleMessage = (message: EventMessage): Promise<EventMessageReturnType> | void => {
  switch (message.type) {
    case EventType.POPUP_MOUNTED:
      return storage.getSiteSettings();
    case EventType.REPLACE:
      return replaceText(message.payload as Mutation[]);
    case EventType.SAVE:
      return saveRules(message.payload as SiteSettings);
    default:
      console.log('AutoReplace recieved unknown message: ', message);
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
        isUsingRegex: false,
        isCaseSensitive: true,
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
        isUsingRegex: false,
        isCaseSensitive: true,
      },
    ],
  });
};

createMockData();

const runReplacer = async () => {
  const siteSettings = await storage.getSiteSettings();
  replaceText(siteSettings?.rules || []);
};

window.addEventListener('onload', () => runReplacer());
