import { v4 as uuid } from 'uuid';
import { Mutation, SiteSettings } from '../utils/constants';
import storage from '../utils/storage';
import { getTextNodes, replaceText } from './replacer';

// eslint-disable-next-line import/prefer-default-export
export const saveMutations = async (settings: SiteSettings): Promise<void> => {
  const siteSettings = await storage.getSiteSettings();
  await storage.setSiteSettings({
    ...siteSettings,
    ...settings,
    uuid: siteSettings?.uuid || uuid(),
  });
};

export const createObserver = (mutations: Mutation[]): MutationObserver => {
  console.log('createObserver');
  const targetNode = document.body;
  const callback = (mutationsList: MutationRecord[], observer: MutationObserver): void => {
    mutationsList.forEach((mutation) => {
      console.log('createObserver::addedNodes', mutation.addedNodes);
      mutation.addedNodes.forEach((node) => {
        const textNodes = getTextNodes(node);
        replaceText(mutations, textNodes);
      });
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, { attributes: true, childList: true, subtree: true });

  return observer;
};
