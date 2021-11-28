import React, { FunctionComponent, ReactElement } from 'react';
import { EventType, Messenger, Rule } from '../../utils/constants';
import ReplaceRow from './ReplaceRow';
import ToggleButton from './ToggleButton';

interface PopupParams {
  messenger: Messenger;
}

export const Popup: FunctionComponent<PopupParams> = ({ messenger }) => {
  const emptyValue = { query: '', replaceString: '', isUsingRegex: false, isCaseSensitive: false };
  const [values, setValues] = React.useState<Rule[]>([emptyValue]);

  const handleChange = (index: number, rule: Rule) => {
    const newValues: Rule[] = [...values];
    newValues[index] = rule;
    setValues(newValues);
  };

  const createRows = () => {
    const rows: ReactElement[] = [];
    values.forEach((value, i) => {
      rows.push(
        <ReplaceRow
          key={i}
          mutation={value}
          setMutation={handleChange.bind(null, i)}
          onDelete={handleDelete.bind(null, i)}
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
