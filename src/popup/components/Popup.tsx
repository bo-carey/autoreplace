import React, { FunctionComponent } from 'react';
import { browser } from 'webextension-polyfill-ts';
import { EventType, SearchResult } from '../../utils/constants';
import { sendMessage } from '../../utils/comms';

export const Popup: FunctionComponent = () => {
  const [resultString, setResultString] = React.useState<string>('');
  const [searchInput, setSearchinput] = React.useState<string>('');
  let resultCount: number;
  let activeResult: number;
  const searchRef = React.useRef<HTMLInputElement>(null);

  const search = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const query = ev.target.value || '';
    setSearchinput(query);
    const searchParams = {
      query,
      activeResult,
    };
    // browser.runtime.sendMessage(searchParams).then((result: SearchResult) => {
    //   console.log('search result :>> ', result);
    //   resultCount = result.count;
    //   activeResult = result.active;
    //   setResultString(`${activeResult} of ${resultCount}`);
    // });
    sendMessage(EventType.SEARCH, searchParams);
  };
  const keyUp = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    console.log('ev.keyUp :>> ', ev.key);
  };

  React.useEffect(() => {
    // browser.runtime.sendMessage({ eventType: EventType.POPUP_MOUNTED });
    sendMessage(EventType.POPUP_MOUNTED);
    searchRef?.current?.focus();
  }, []);

  return (
    <div id="cont">
      <button>&darr;</button>
      <div id="rows">
        <div className="row">
          <input
            type="text"
            tabIndex={1}
            value={searchInput}
            onChange={search}
            onKeyUp={keyUp}
            ref={searchRef}
          />
          <span>{resultString}</span>
          <button>&uarr;</button>
          <button>&darr;</button>
          <button>&#9776;</button>
          <button>&times;</button>
        </div>
        <div className="row">
          <input tabIndex={1} type="text" />
          <button>&#9735;</button>
          <button>&#9736;</button>
        </div>
      </div>
    </div>
  );
};
