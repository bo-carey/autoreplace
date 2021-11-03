import { browser } from 'webextension-polyfill-ts';
import { matchUrl } from '@bo-carey/urlglob';

import { SiteKey, SiteSettings } from './constants';

const getAllKeys = async (): Promise<SiteKey[]> => {
  const data = await browser.storage.sync.get('allKeys');
  const allKeys = data?.allKeys || [];
  return allKeys;
};

const getSiteKey = async (location = window.location.href): Promise<SiteKey | null> => {
  const allKeys = await getAllKeys();
  const siteKey = allKeys.find((k) => matchUrl(location, k.urlGlob));
  return siteKey || null;
};

const setAllKeys = async (allKeys: SiteKey[]): Promise<void> => {
  await browser.storage.sync.set({ allKeys });
};

const setSiteKey = async (siteKey: SiteKey): Promise<void> => {
  const allKeys = await getAllKeys();
  await setAllKeys(allKeys.map((k) => (siteKey.uuid === k.uuid ? siteKey : k)));
};

const getSiteSettings = async (): Promise<SiteSettings | null> => {
  const siteKey = await getSiteKey();
  const uuid = siteKey?.uuid;
  if (!uuid || !uuid?.length) return null;
  const { [uuid]: siteSettings } = await browser.storage.sync.get(uuid);
  if (siteSettings.uuid !== uuid) return null;
  return siteSettings;
};

const setSiteSettings = async (siteSettings: SiteSettings): Promise<void> => {
  await browser.storage.sync.set({ [siteSettings.uuid]: siteSettings });
  return;
};

export default {
  getAllKeys,
  getSiteKey,
  setAllKeys,
  setSiteKey,
  getSiteSettings,
  setSiteSettings,
};
