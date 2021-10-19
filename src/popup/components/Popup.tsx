import React, { FunctionComponent } from 'react';
import { EventType, ReplacePair } from '../../utils/constants';
import { sendMessage } from '../../utils/comms';

export const Popup: FunctionComponent = () => {
  const [query, setQuery] = React.useState<string>('');
  const [replaceString, setReplaceString] = React.useState<string>('');
  const searchRef = React.useRef<HTMLInputElement>(null);

  const replace = () => {
    const searchParams: ReplacePair = {
      query,
      replaceString,
    };
    sendMessage(EventType.SEARCH, [searchParams]);
  };

  React.useEffect(() => {
    sendMessage(EventType.POPUP_MOUNTED);
    searchRef?.current?.focus();
  }, []);

  return (
    <div id="cont">
      <div id="rows">
        <div className="row">
          <input
            type="text"
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
            ref={searchRef}
          />
          <input
            type="text"
            value={replaceString}
            onChange={(ev) => setReplaceString(ev.target.value)}
          />
        </div>
      </div>
      <button onClick={replace}>Replace!</button>
    </div>
  );
};
