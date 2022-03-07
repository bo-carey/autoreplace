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
import testData from '../utils/testData';

let allTextNodes: Element[] = [];

const getTextNodes = (el: Element = document.body): Element[] => {
  const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (node: Node) => {
      if (node?.textContent?.length === 0
            || node?.parentNode?.nodeName === 'SCRIPT'
            || node?.parentNode?.nodeName === 'STYLE'
      ) {
        // Don't include 0 length, <script>, or <style> text nodes.
        return NodeFilter.FILTER_SKIP;
      } // else
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const textNodes = [];
  let node = treeWalker.nextNode();
  while (node) {
    textNodes.push(node as Element);
    node = treeWalker.nextNode();
  }
  return textNodes;
};

const textReplace = ({
  query, replaceString, isCaseSensitive,
}: Mutation) => {
  const casedQuery = isCaseSensitive ? query : query.toLowerCase();
  console.log('textReplace::casedQuery', casedQuery);
  for (let i = 0; i < allTextNodes.length; i++) {
    const node = allTextNodes[i];
    const currentValue = node.textContent || null;
    let newValue = currentValue;
    newValue = newValue?.replace(casedQuery, replaceString) || null;
    if (currentValue && newValue && currentValue !== newValue) {
      node.textContent = newValue;
    }
  }
};

const regexReplace = ({
  query, replaceString, isCaseSensitive,
}: Mutation) => {
  try {
    const regexQuery = new RegExp(query, `g${!isCaseSensitive ? 'i' : ''}`);
    console.log('regexReplace::regexQuery', regexQuery);
    for (let i = 0; i < allTextNodes.length; i++) {
      const node = allTextNodes[i];
      const currentValue = node.textContent || null;
      const newValue = node.textContent?.replace(regexQuery, replaceString) || null;
      if (currentValue && newValue && currentValue !== newValue) {
        node.textContent = newValue;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const replaceText = (mutations: Mutation[]) => {
  mutations.forEach((pair) => {
    console.log('pair', pair);
    if (pair.isUsingRegex) {
      regexReplace(pair);
    } else {
      textReplace(pair);
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
  console.log('message', message);
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
  return Promise.resolve();
};

browser.runtime.onMessage.addListener(handleMessage);

allTextNodes = getTextNodes();

const createMockData = async (): Promise<void> => {
  testData.forEach((data) => storage.setSiteSettings(data));
};

createMockData();

const runReplacer = async () => {
  const siteSettings = await storage.getSiteSettings();
  replaceText(siteSettings?.rules || []);
};

window.addEventListener('onload', () => runReplacer());
