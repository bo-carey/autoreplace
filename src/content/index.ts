import { browser } from 'webextension-polyfill-ts';
import {
  EventType,
  EventMessage,
  Mutation,
  SiteSettings,
  EventMessageReturnType,
} from '../utils/constants';
import { getTextNodes, replaceText } from './replacer';
import { saveMutations, createObserver } from './automation';
import storage from '../utils/storage';
import testData from '../utils/testData';

let allTextNodes: Element[] = [];
let mutations: Mutation[] | null = null;
let observer: MutationObserver | null = null;

const handleMessage = (message: EventMessage): Promise<EventMessageReturnType> | void => {
  console.log('handleMessage');
  console.log('handleMessage::message', message);
  switch (message.type) {
    case EventType.POPUP_MOUNTED:
      return storage.getSiteSettings();
    case EventType.REPLACE:
      if (observer) observer.disconnect();
      return replaceText(message.payload as Mutation[], allTextNodes);
    case EventType.SAVE:
      return saveMutations(message.payload as SiteSettings);
    default:
      console.log('AutoReplace recieved unknown message: ', message);
  }
  return Promise.resolve();
};

// The replacer with check local storage for site settings and if found,
// it will run the mutations and create an observer.
const runReplacer = async () => {
  console.log('runReplacer');
  allTextNodes = getTextNodes();
  await storage.setSiteSettings(testData[0]);
  const siteSettings = await storage.getSiteSettings();
  mutations = siteSettings?.mutations || null;
  console.log('runReplacer::mutations', mutations);
  if (mutations?.length) {
    replaceText(mutations || [], allTextNodes);
    observer = createObserver(mutations);
  }
};

browser.runtime.onMessage.addListener(handleMessage);
window.addEventListener('onload', () => runReplacer());
