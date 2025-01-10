interface TokenTextInputProps {
    tokenKey: string;
    tokenValueConstraint: string; // TEXT | NUMBER
    onTokenValueChange: (featureTemplateStepId: string, tokenKey: string, value: string) => void;
    tokenValue?: string;
    scenarioStepId: string;
}

export default function TokenTextInput({ 
    tokenKey,
    tokenValueConstraint, 
    onTokenValueChange, 
    scenarioStepId,
    tokenValue 
}: TokenTextInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onTokenValueChange(scenarioStepId, tokenKey, e.target.value);
    };

    return (
        <input
            type={tokenValueConstraint}
            value={tokenValue ?? ""}
            onChange={handleChange}
            placeholder={`Enter a ${tokenValueConstraint}...`}
            style={{ marginRight: "8px" }}
    />
    );
}