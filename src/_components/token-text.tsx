interface TokenTextProps {
    tokenKey: string;
    tokenValueConstraint: string; // TEXT | NUMBER
    onTokenValueChange: (featureTemplateStepId: string, tokenKey: string, value: string) => void;
    tokenValue?: string;
    featureStepId: string;
}

export default function TokenText({ 
    tokenKey,
    tokenValueConstraint, 
    onTokenValueChange, 
    featureStepId,
    tokenValue 
}: TokenTextProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onTokenValueChange(featureStepId, tokenKey, e.target.value);
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