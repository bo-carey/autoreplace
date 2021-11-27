import { ChangeEventHandler, FunctionComponent, MouseEventHandler } from 'react';
import ComplexInput from './ComplexInput';
import ToggleButton from './ToggleButton';

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
    <ComplexInput value={query} onChange={setQuery}>
      <ToggleButton tooltip="Match Case" isSelected={isCaseSensitive} onSelect={setIsCaseSensitive}>Aa</ToggleButton>
		  <ToggleButton tooltip="Use Regular Expression" isSelected={isUsingRegex} onSelect={setIsUsingRegex}>.*</ToggleButton>
    </ComplexInput>
    <ComplexInput value={replaceString} onChange={setReplaceString}>
      <button className="delete" onClick={deleteRow}>&times;</button>
    </ComplexInput>
  </div>
);
export default ReplaceRow;
