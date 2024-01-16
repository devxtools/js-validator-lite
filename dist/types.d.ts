export type RuleType = {
    value: RegExp | Function;
    message: string;
};
export type RuleTypes = {
    [key: string]: RuleType;
};
export type Rule = {
    type?: string;
    message?: string;
    regex?: RegExp;
    required?: boolean;
    validator?: (name: string, value: any, callback: (tip: string) => void) => void;
};
export type Rules = {
    [key: string]: Rule[];
};
