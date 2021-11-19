import { ChangeEventHandler, FunctionComponent } from "react";
import ToggleButton from "./ToggleButton";

export interface ComplexInputProps {
	value: string;
  setQuery: ChangeEventHandler<HTMLInputElement>;
  isCaseSensitive: boolean;
  isUsingRegex: boolean;
  setIsCaseSensitive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUsingRegex: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComplexInput: FunctionComponent<ComplexInputProps> = ({value, setQuery, isCaseSensitive, isUsingRegex, setIsCaseSensitive, setIsUsingRegex}) => (
	<div className="ComplexInput">
		<input type="text" value={value} onChange={setQuery}/>
		<ToggleButton tooltip="Match Case" isSelected={isCaseSensitive} onSelect={setIsCaseSensitive}>Aa</ToggleButton>
		<ToggleButton tooltip="Use Regular Expression" isSelected={isUsingRegex} onSelect={setIsUsingRegex}>.*</ToggleButton>
	</div>
)

export default ComplexInput;
