import React, { FunctionComponent, ReactElement } from 'react';
import { EventType, Messenger, Mutation, SiteSettings } from '../../utils/constants';
import ReplaceRow from './ReplaceRow';

interface PopupParams {
  messenger: Messenger;
}

export const Popup: FunctionComponent<PopupParams> = ({ messenger }) => {
  const emptyValue = { query: '', replaceString: '', isUsingRegex: false, isCaseSensitive: false };
  const [values, setValues] = React.useState<Mutation[]>([emptyValue]);
  const [urlGlob, setUrlGlob] = React.useState<string | undefined>(undefined);
  const [uuid, setUuid] = React.useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const handleChange = (index: number, rule: Mutation) => {
    const newValues: Mutation[] = [...values];
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
    messenger.getSiteSettings().then((siteSettings: SiteSettings) => {
      setUrlGlob(siteSettings.urlGlob);
      setUuid(siteSettings.uuid);
      setValues(siteSettings.rules);
      setIsLoading(false);
    });
  }, []);

  return (
    <div id="cont" className={isLoading ? 'loading' : ''}>
      <div id="rows">{createRows()}</div>
      <button className="add-row" onClick={addRow}>
        Add Row
      </button>
      <button onClick={replace}>Run Now</button>
      <button onClick={save}>Save</button>
    </div>
  );
};
