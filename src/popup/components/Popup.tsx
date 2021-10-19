import React, { FunctionComponent, ReactElement, RefObject } from 'react';
import { EventType, ReplacePair } from '../../utils/constants';
import { sendMessage } from '../../utils/comms';
import ReplaceRow from './ReplaceRow';

export const Popup: FunctionComponent = () => {
  const emptyValue = { query: '', replaceString: '' };
  const [values, setValues] = React.useState<ReplacePair[]>([emptyValue]);
  const [refs, setRefs] = React.useState<RefObject<HTMLInputElement>[]>([]);

  const createRows = () => {
    const rows: ReactElement[] = [];
    values.forEach((value, i) => {
      refs.push(React.useRef<HTMLInputElement>(null));
      rows.push(
        <ReplaceRow
          query={value.query}
          setQuery={(ev) => handleChange(i, ev, 'query')}
          replaceString={value.replaceString}
          setReplaceString={(ev) => handleChange(i, ev, 'replaceString')}
          deleteRow={() => handleDelete(i)}
          inputRef={refs[i]}
        />,
      );
    });

    return rows;
  };

  const handleChange = (
    index: number,
    ev: React.ChangeEvent<HTMLInputElement>,
    key: 'query' | 'replaceString',
  ) => {
    const newValues: ReplacePair[] = values;
    newValues[index][key] = ev.target.value;
    setValues(newValues);
  };

  const handleDelete = (index: number) => {
    setValues(values.filter((v, i) => i !== index));
  };

  const replace = () => {
    sendMessage(EventType.SEARCH, values);
  };

  React.useEffect(() => {
    sendMessage(EventType.POPUP_MOUNTED);
    refs[refs.length - 1]?.current?.focus();
  }, []);

  return (
    <div id="cont">
      <div id="rows">{createRows()}</div>
      <button onClick={replace}>Replace!</button>
    </div>
  );
};
