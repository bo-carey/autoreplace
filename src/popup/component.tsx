import React, { FunctionComponent } from 'react';
import { browser } from 'webextension-polyfill-ts';

export const Popup: FunctionComponent = () => {
  React.useEffect(() => {
    browser.runtime.sendMessage({ popupMounted: true });
  }, []);

  return <div></div>;
};
