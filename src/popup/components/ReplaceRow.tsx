import { ChangeEventHandler, FunctionComponent, MouseEventHandler } from 'react';
import ComplexInput from './ComplexInput';

interface ReplaceRowParams {
  query: string;
  setQuery: ChangeEventHandler<HTMLInputElement>;
  replaceString: string;
  setReplaceString: ChangeEventHandler<HTMLInputElement>;
  deleteRow: MouseEventHandler<HTMLButtonElement>;
  isCaseSensitive: boolean;
  isUsingRegex: boolean;
  setIsCaseSensitive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUsingRegex: React.Dispatch<React.SetStateAction<boolean>>;
}
 
const ReplaceRow: FunctionComponent<ReplaceRowParams> = ({
  query,
  setQuery,
  replaceString,
  setReplaceString,
  deleteRow,
  isCaseSensitive,
  isUsingRegex,
  setIsCaseSensitive,
  setIsUsingRegex,
}) => (
  <div className="row">
    <ComplexInput value={query} setQuery={setQuery} isCaseSensitive={isCaseSensitive} isUsingRegex={isUsingRegex} setIsCaseSensitive={setIsCaseSensitive} setIsUsingRegex={setIsUsingRegex} />
    <input type="text" value={replaceString} onChange={setReplaceString} />
    <button onClick={deleteRow}>D</button>
  </div>
);
export default ReplaceRow;
