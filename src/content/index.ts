import { browser } from 'webextension-polyfill-ts';
import { EventType, EventMessage, ReplacePair } from '../utils/constants';

// let allTextNodes: Element[] = [];
const text = [
  'He moonlight difficult engrossed an it sportsmen. Interested has',
  'all',
  'devonshire difficulty',
  'gay assistance joy. Unaffected at ye of',
  'compliment alteration',
  'to. Place voice no',
  '   ',
  '',
  'arise along to. Parlors waiting so against',
  'me no. Wishing calling are warrant settled was',
  'luckily. Express besides it present if at an opinion',
  'visitor',
  '. Had strictly mrs handsome mistaken cheerful. We',
  'it',
  'so if resolution invitation remarkably unpleasant conviction.',
  'As into ye then form. To easy five less if rose were.',
  'Now set',
  'offended own out required entirely. Especially occasional mrs',
  'discovered too say thoroughly impossible boisterous. My head',
  'when real no he high rich at with. After so',
  'power of young as. Bore year does has get long fat cold saw neat',
  '. Put boy carried chiefly shy general.',
];

// const getTextNodes = (el: Element): Element[] => {
//   let node;
//   const textNodes = [];
//   const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
//   while ((node = treeWalker.nextNode())) textNodes.push(node as Element);
//   return textNodes;
// };

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
    for (let i = 0; i < text.length; i++) {
      text[i] = text[i].replace(regexQuery, replaceString);
    }
  });
  console.log(`text`, text);
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

// allTextNodes = getTextNodes(document.body);
// console.log(`document.body`, document.body);
// console.log(`allTextNodes`, allTextNodes);
