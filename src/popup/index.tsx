import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browser } from 'webextension-polyfill-ts';
import { Popup } from './component';

browser.tabs
  .query({ active: true, currentWindow: true, url: '*://*.backstabbr.com/game/*' })
  .then(() => {
    ReactDOM.render(<Popup />, document.getElementById('popup'));
  });
