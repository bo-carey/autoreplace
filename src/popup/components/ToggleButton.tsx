import { FunctionComponent } from "react";

export interface ToggleButtonProps {
  tooltip: string;
	isSelected: boolean;
  onSelect: (a: boolean) => void;
}

const ToggleButton: FunctionComponent<ToggleButtonProps> = ({tooltip = '', isSelected, onSelect, children}) => (
	<button
    title={tooltip}
    className={isSelected ? 'selected' : ''}
    onClick={() => onSelect(!isSelected)}
  >
    {children}
  </button>
)

export default ToggleButton;
