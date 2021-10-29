import { browser } from 'webextension-polyfill-ts';
import { EventType, EventMessage, ReplacePair } from '../utils/constants';

let allTextNodes: Element[] = [];

const getTextNodes = (el: Element = document.body): Element[] => {
  let node;
  const textNodes = [];
  const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  while ((node = treeWalker.nextNode())) textNodes.push(node as Element);
  return textNodes;
};

// const findInDocument = async (request: any): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     const { query, activeResult } = request;
//     let foundMatches = 0;
//     for (let i = 0; i < allTextNodes.length; i++) {
//       const textNode = allTextNodes[i];
//       const startIndex = textNode.textContent?.indexOf(query);
//       if (startIndex === -1) return;
//       foundMatches++;
//       const endIndex = startIndex + query.length;

//     }
//   });
// };
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

const testStorage = async () => {
  console.dir('testStorage');
  await browser.storage.sync.set({
    allKeys: [
      { uuid: '00000000-0000-0000-0000-000000000000', urlGlob: '*://www.google.com/*' },
      { uuid: '11111111-1111-1111-1111-111111111111', urlGlob: '*://www.*.com' },
    ],
    '00000000-0000-0000-0000-000000000000': {
      uuid: '00000000-0000-0000-0000-000000000000',
      urlGlob: '*://www.google.com/*',
      rules: [
        {
          query: 'a',
          replaceText: 'o',
        },
      ],
    },
    '11111111-1111-1111-1111-111111111111': {
      uuid: '11111111-1111-1111-1111-111111111111',
      urlGlob: '*://www.*.com',
      rules: [
        {
          query: 'a',
          replaceText: 'o',
        },
      ],
    },
  });
  const allKeys = await browser.storage.sync.get('allKeys');
  console.log(`allKeys`, allKeys);
};
testStorage();
