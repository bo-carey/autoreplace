import React, { FunctionComponent } from 'react';
import { browser } from 'webextension-polyfill-ts';
import { EventType, SearchResult } from '../../constants';

export const Popup: FunctionComponent = () => {
  const [resultString, setResultString] = React.useState<string>('');
  const [searchInput, setSearchinput] = React.useState<string>('');
  let resultCount: number;
  let activeResult: number;

  const search = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const query = ev.target.value || '';
    setSearchinput(query);
    const searchParams = {
      eventType: EventType.SEARCH,
      query,
      activeResult,
    };
    browser.runtime.sendMessage(searchParams).then((result: SearchResult) => {
      console.log('search result :>> ', result);
      resultCount = result.count;
      activeResult = result.active;
      setResultString(`${activeResult} of ${resultCount}`);
    });
  };

  React.useEffect(() => {
    browser.runtime.sendMessage({ eventType: EventType.POPUP_MOUNTED });
  }, []);

  return (
    <div id="cont">
      <button>&darr;</button>
      <div id="rows">
        <div className="row">
          <input type="text" value={searchInput} onChange={search} />
          <span>{resultString}</span>
          <button>&uarr;</button>
          <button>&darr;</button>
          <button>&#9776;</button>
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
