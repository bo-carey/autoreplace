import React, { FunctionComponent, ReactElement } from 'react';
import { EventType, Rule } from '../../utils/constants';
import { sendMessage } from '../../utils/comms';
import ReplaceRow from './ReplaceRow';

export const Popup: FunctionComponent = () => {
  const emptyValue = { query: '', replaceString: '' };
  const [values, setValues] = React.useState<Rule[]>([emptyValue]);

  const handleChange = (
    index: number,
    ev: React.ChangeEvent<HTMLInputElement>,
    key: 'query' | 'replaceString',
  ) => {
    const newValues: Rule[] = [...values];
    newValues[index][key] = ev.target.value;
    setValues(newValues);
  };

  const createRows = () => {
    const rows: ReactElement[] = [];
    values.forEach((value, i) => {
      rows.push(
        <ReplaceRow
          key={i}
          query={value.query}
          setQuery={(ev) => handleChange(i, ev, 'query')}
          replaceString={value.replaceString}
          setReplaceString={(ev) => handleChange(i, ev, 'replaceString')}
          deleteRow={() => handleDelete(i)}
        />,
      );
    });

    return rows;
  };

  const handleDelete = (index: number) => {
    setValues(values.filter((v, i) => i !== index));
  };

  const addRow = () => {
    setValues([...values, emptyValue]);
  };

  const replace = () => {
    sendMessage(EventType.SEARCH, values);
  };

  React.useEffect(() => {
    sendMessage(EventType.POPUP_MOUNTED);
  }, []);

  return (
    <div id="cont">
      <div id="rows">{createRows()}</div>
      <button onClick={addRow}>Add Row</button>
      <button onClick={replace}>Replace!</button>
    </div>
  );
};
