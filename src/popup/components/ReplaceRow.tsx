import React, {
  ChangeEventHandler,
  FunctionComponent,
  MouseEventHandler,
  RefObject,
} from 'react';

interface ReplaceRowParams {
  query: string;
  setQuery: ChangeEventHandler<HTMLInputElement>;
  replaceString: string;
  setReplaceString: ChangeEventHandler<HTMLInputElement>;
  deleteRow: MouseEventHandler<HTMLButtonElement>;
  inputRef: RefObject<HTMLInputElement>;
}

const ReplaceRow: FunctionComponent<ReplaceRowParams> = ({
  query,
  setQuery,
  replaceString,
  setReplaceString,
  deleteRow,
  inputRef,
}) => {
  return (
    <div className="row">
      <input type="text" value={query} onChange={setQuery} ref={inputRef} />
      <input type="text" value={replaceString} onChange={setReplaceString} />
      <button onClick={deleteRow}>D</button>
    </div>
  );
};
export default ReplaceRow;
