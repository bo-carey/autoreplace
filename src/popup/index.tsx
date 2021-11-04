import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browser } from 'webextension-polyfill-ts';
import { Popup } from './components/Popup';
import './style.scss';

// query for an open tab, then render the Popup component
browser.tabs.query({ active: true, currentWindow: true }).then(() => {
  ReactDOM.render(<Popup />, document.getElementById('popup'));
});
