import React, { FunctionComponent, ReactElement } from 'react';
import {
  EventType, Messenger, Mutation, SiteSettings,
} from '../../utils/constants';
import ReplaceRow from './ReplaceRow';

interface PopupParams {
  messenger: Messenger;
}

const Popup: FunctionComponent<PopupParams> = ({ messenger }) => {
  const emptyValue = {
    query: '', replaceString: '', isUsingRegex: false, isCaseSensitive: false,
  };
  const [values, setValues] = React.useState<Mutation[]>([emptyValue]);
  const [urlGlob, setUrlGlob] = React.useState<string | undefined>(undefined);
  const [uuid, setUuid] = React.useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const handleChange = (index: number, rule: Mutation) => {
    const newValues: Mutation[] = [...values];
    newValues[index] = rule;
    setValues(newValues);
  };

  const handleDelete = (index: number) => setValues(values.filter((v, i) => i !== index));

  const addRow = () => setValues([...values, emptyValue]);

  const replace = () => messenger.send(EventType.REPLACE, values);

  const save = () => messenger.send(EventType.SAVE, values);

  const createRows = () => {
    const rows: ReactElement[] = [];
    values.forEach((value, i) => {
      rows.push(
        <ReplaceRow
          key={i}
          mutation={value}
          setMutation={(v) => handleChange(i, v)}
          onDelete={() => handleDelete(i)}
        />,
      );
    });
    return rows;
  };

  React.useEffect(() => {
    messenger.getSiteSettings().then((siteSettings: SiteSettings) => {
      setUrlGlob(siteSettings.urlGlob);
      setUuid(siteSettings.uuid);
      setValues(siteSettings.rules);
      setIsLoading(false);
    });
  }, [messenger]);

  return (
    <div id="cont" className={isLoading ? 'loading' : ''}>
      <div id="rows">{createRows()}</div>
      <button type="button" className="add-row" onClick={addRow}>
        Add Row
      </button>
      <button type="button" onClick={replace}>Run Now</button>
      <button type="button" onClick={save}>Save</button>
    </div>
  );
};

export default Popup;
