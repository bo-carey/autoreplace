import { browser } from 'webextension-polyfill-ts';
import {
  EventType,
  EventMessage,
  Mutation,
  SiteSettings,
  EventMessageReturnType,
} from '../utils/constants';
import { getTextNodes, replaceText } from './replacer';
import { saveRules } from './automation';
import storage from '../utils/storage';
import testData from '../utils/testData';

let allTextNodes: Element[] = [];

const handleMessage = (message: EventMessage): Promise<EventMessageReturnType> | void => {
  console.log('message', message);
  switch (message.type) {
    case EventType.POPUP_MOUNTED:
      return storage.getSiteSettings();
    case EventType.REPLACE:
      return replaceText(message.payload as Mutation[], allTextNodes);
    case EventType.SAVE:
      return saveRules(message.payload as SiteSettings);
    default:
      console.log('AutoReplace recieved unknown message: ', message);
  }
  return Promise.resolve();
};

const createMockData = async (): Promise<void> => {
  testData.forEach((data) => storage.setSiteSettings(data));
};

const runReplacer = async () => {
  const siteSettings = await storage.getSiteSettings();
  replaceText(siteSettings?.rules || [], allTextNodes);
};

allTextNodes = getTextNodes();

createMockData();

browser.runtime.onMessage.addListener(handleMessage);
window.addEventListener('onload', () => runReplacer());
