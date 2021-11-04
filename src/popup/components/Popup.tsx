import React, { FunctionComponent, ReactElement } from 'react';
import { EventType, Messenger, Rule } from '../../utils/constants';
import { messengerFactory } from '../../utils/comms';
import ReplaceRow from './ReplaceRow';

export const Popup: FunctionComponent = () => {
  let messenger: Messenger;
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

  const handleDelete = (index: number) => setValues(values.filter((v, i) => i !== index));

  const addRow = () => setValues([...values, emptyValue]);

  const replace = () => messenger.send(EventType.REPLACE, values);

  const save = () => messenger.send(EventType.SAVE, values);

  React.useEffect(() => {
    messengerFactory().then((m) => {
      messenger = m;
      messenger.send(EventType.POPUP_MOUNTED);
    });
  }, []);

  return (
    <div id="cont">
      <div id="rows">{createRows()}</div>
      <button className="add-row" onClick={addRow}>
        Add Row
      </button>
      <button onClick={replace}>Run Now</button>
      <button onClick={save}>Save</button>
    </div>
  );
};
