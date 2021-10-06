import { browser } from 'webextension-polyfill-ts';

browser.runtime.onInstalled.addListener((installation) => {
  console.dir('background script installed');
});
