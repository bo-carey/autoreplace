import { browser } from 'webextension-polyfill-ts';
import { EventType, EventMessage } from '../utils/constants';

let allTextNodes: Element[] = [];

const getTextNodes = (el: Element): Element[] => {
  let node;
  const textNodes = [];
  const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  while ((node = treeWalker.nextNode())) textNodes.push(node as Element);
  return textNodes;
};

const findInDocument = async (request: any): Promise<any> => {
  return new Promise((resolve, reject) => {});
};

const handleMessage = (message: EventMessage): Promise<any | null> => {
  return new Promise((resolve, reject) => {
    switch (message.type) {
      case EventType.POPUP_MOUNTED:
        console.log('backgroundPage notified that Popup.tsx has mounted.');
        break;
      case EventType.SEARCH:
        console.log('seach query', message.payload);
        break;
      default:
        console.log('Recieved unknown message: ', message.payload);
    }
    resolve(true);
  });
};

browser.runtime.onMessage.addListener(handleMessage);

allTextNodes = getTextNodes(document.body);
console.log(`document.body`, document.body);
console.log(`allTextNodes`, allTextNodes);
