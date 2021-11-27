import { ChangeEventHandler, FunctionComponent } from "react";

export interface ComplexInputProps {
	value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const ComplexInput: FunctionComponent<ComplexInputProps> = ({value, onChange, children}) => (
	<div className="ComplexInput">
		<input type="text" value={value} onChange={onChange}/>
		{children}
	</div>
)

export default ComplexInput;
