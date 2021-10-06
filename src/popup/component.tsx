import React, { FunctionComponent } from 'react';
import { browser } from 'webextension-polyfill-ts';

export const Popup: FunctionComponent = () => {
  React.useEffect(() => {
    browser.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <div id="cont">
      <button>&darr;</button>
      <div id="rows">
        <div className="row">
          <input type="text" />
          <span>? of 2</span>
          <button>&uarr;</button>
          <button>&darr;</button>
          <button>&#9776</button>
          <button>&times;</button>
        </div>
        <div className="row">
          <input type="text" />
          <button>&#9735;</button>
          <button>&#9736;</button>
        </div>
      </div>
    </div>
  );
};
