import React, { FunctionComponent, ReactElement } from 'react';
import { EventType, Messenger, Rule } from '../../utils/constants';
import ReplaceRow from './ReplaceRow';

interface PopupParams {
  messenger: Messenger;
}

export const Popup: FunctionComponent<PopupParams> = ({ messenger }) => {
  const emptyValue = { query: '', replaceString: '' };
  const [values, setValues] = React.useState<Rule[]>([emptyValue]);
  const [isCaseSensitive, setIsCaseSensitive] = React.useState<boolean>(false);
  const [isUsingRegex, setIsUsingRegex] = React.useState<boolean>(false);

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
          isCaseSensitive={isCaseSensitive}
          isUsingRegex={isUsingRegex}
          setIsCaseSensitive={setIsCaseSensitive}
          setIsUsingRegex={setIsUsingRegex}
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
    messenger.send(EventType.POPUP_MOUNTED).then((siteData) => {
      console.log('siteData :>> ', siteData);
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
