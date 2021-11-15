import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browser } from 'webextension-polyfill-ts';
import { Popup } from './components/Popup';
import { messengerFactory } from '../utils/comms';
import './style.scss';

// query for an open tab, then render the Popup component
browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
  ReactDOM.render(
    <Popup messenger={messengerFactory(tabs[0])} />,
    document.getElementById('popup'),
  );
});
