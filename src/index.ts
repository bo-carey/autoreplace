import { browser } from 'webextension-polyfill-ts';
// import { runBackstabbrAssistant } from './scripts/backstabbr';
console.dir('starting backstabbr assistant');
// runBackstabbrAssistant();

browser.runtime.onMessage.addListener((request: { popupMounted: boolean }) => {
  if (request.popupMounted) {
    console.log('backgroundPage notified that Popup.tsx has mounted.');
  }
});
