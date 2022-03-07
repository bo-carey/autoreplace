import { v4 as uuid } from 'uuid';
import { SiteSettings } from '../utils/constants';
import storage from '../utils/storage';

// eslint-disable-next-line import/prefer-default-export
export const saveRules = async (settings: SiteSettings): Promise<void> => {
  const siteSettings = await storage.getSiteSettings();
  await storage.setSiteSettings({
    ...siteSettings,
    ...settings,
    uuid: siteSettings?.uuid || uuid(),
  });
};
