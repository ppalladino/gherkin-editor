interface TokenSelectInputProps {
    tokenKey: string;
    tokenOptions: string[];
    onSelectedOptionChange: (featureTemplateStepId: string, tokenKey: string, option: string) => void;
    scenarioStepId: string;
    selectedTokenOption?: string;
  }

export default function TokenSelectInput({ 
    tokenKey,
    tokenOptions, 
    selectedTokenOption, 
    scenarioStepId,
    onSelectedOptionChange 
}: TokenSelectInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectedOptionChange(scenarioStepId, tokenKey, e.target.value);
    };

    return (
        <select
            value={selectedTokenOption ?? ""}     // use empty string if undefined
            onChange={handleChange}
        >
            <option disabled value="">Please select</option>
            {tokenOptions.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}