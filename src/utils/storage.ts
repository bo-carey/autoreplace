import { browser } from 'webextension-polyfill-ts';
import { matchUrl } from '@bo-carey/urlglob';
import { v4 as uuidv4 } from 'uuid';

import { SiteSettings } from './constants';

// const getAllKeys = async (): Promise<SiteKey[]> => {
//   const data = await browser.storage.local.get('allKeys');
//   const allKeys = data?.allKeys || [];
//   return allKeys;
// };

// const getSiteKey = async (location = window.location.href): Promise<SiteKey | null> => {
//   const allKeys = await getAllKeys();
//   const siteKey = allKeys.find((k) => matchUrl(location, k.urlGlob));
//   return siteKey || null;
// };

// const setAllKeys = async (allKeys: SiteKey[]): Promise<void> => {
//   await browser.storage.local.set({ allKeys });
// };

// const setSiteKey = async (siteKey: SiteKey): Promise<void> => {
//   const allKeys = await getAllKeys();
//   await setAllKeys(allKeys.map((k) => (siteKey.uuid === k.uuid ? siteKey : k)));
// };

const getAllSiteSettings = async (): Promise<{ [s: string]: any }> => {
  const data = await browser.storage.local.get();
  return data;
};

const getSiteSettings = async (
  location = window.location.href,
): Promise<SiteSettings | null> => {
  console.dir('getting site settings');
  const allSiteSettings = await getAllSiteSettings();
  const keys = Object.keys(allSiteSettings);
  for (let i = 0; i < keys.length; i++) {
    const siteSettings = allSiteSettings[keys[i]];
    if (matchUrl(location, siteSettings.urlGlob)) {
      return siteSettings;
    }
  }
  console.dir('no site settings found'); // eslint-disable-line no-console
  return null;
};

const setSiteSettings = async (siteSettings: SiteSettings): Promise<void> => {
  console.log('setting site settings');
  await browser.storage.local.set({ [siteSettings.uuid]: siteSettings });
};

export default {
  // getAllKeys,
  // getSiteKey,
  // setAllKeys,
  // setSiteKey,
  getSiteSettings,
  setSiteSettings,
};
