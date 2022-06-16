export interface ISPPercentageFieldProps {
    Label: string;
    Data?: any;
    DecimalScale?: number;
    FieldName?: string;
    ClassName?: string | string[];
    ReadOnly?: boolean;
    Disabled?: boolean;
    Required?: boolean | string[];
    Errors?: string[];
    UseIcon?: boolean;
    TipTool?: string;
    onChange?: any;
}