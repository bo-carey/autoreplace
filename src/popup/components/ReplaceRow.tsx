import React, { ChangeEventHandler, FunctionComponent, MouseEventHandler } from 'react';

interface ReplaceRowParams {
  query: string;
  setQuery: ChangeEventHandler<HTMLInputElement>;
  replaceString: string;
  setReplaceString: ChangeEventHandler<HTMLInputElement>;
  deleteRow: MouseEventHandler<HTMLButtonElement>;
}

const ReplaceRow: FunctionComponent<ReplaceRowParams> = ({
  query,
  setQuery,
  replaceString,
  setReplaceString,
  deleteRow,
}) => {
  return (
    <div className="row">
      <input type="text" value={query} onChange={setQuery} />
      <input type="text" value={replaceString} onChange={setReplaceString} />
      <button onClick={deleteRow}>D</button>
    </div>
  );
};
export default ReplaceRow;
