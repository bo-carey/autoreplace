import React from 'react';
import { ChangeEventHandler, FunctionComponent, MouseEventHandler } from 'react';
import {Rule} from '../../utils/constants';
import ComplexInput from './ComplexInput';
import ToggleButton, {ToggleButtonProps} from './ToggleButton';

interface ReplaceRowParams {
  mutation: Rule;
  setMutation: (query: Rule) => void;
  onDelete: () => void;
}
 
const ReplaceRow: FunctionComponent<ReplaceRowParams> = ({
  mutation,
  setMutation,
  onDelete,
}) => {
  const handleChanges = (value: Partial<Rule>) => setMutation({...mutation, ...value});
  return (
    <div className="row">
      <ComplexInput 
        value={mutation.query} 
        onChange={(ev) => handleChanges({query: ev.target.value})}
      >
        <ToggleButton 
          tooltip="Match Case" 
          isSelected={mutation.isCaseSensitive} 
          onSelect={() => handleChanges({isCaseSensitive: !mutation.isCaseSensitive})}
        >
          Aa
        </ToggleButton>
        <ToggleButton 
          tooltip="Use Regular Expression" 
          isSelected={mutation.isUsingRegex} 
          onSelect={() => handleChanges({isUsingRegex: !mutation.isUsingRegex})}
        >
          .*
        </ToggleButton>
      </ComplexInput>
      <ComplexInput 
        value={mutation.replaceString} 
        onChange={(ev) => handleChanges({replaceString: ev.target.value})}
      >
        <button className="delete" onClick={onDelete}>&times;</button>
      </ComplexInput>
    </div>
  );
};
export default ReplaceRow;
