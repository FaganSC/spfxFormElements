export interface ISPToggleFieldProps {
    Label: string;
    Data?: any;
    OffText?: string;
    OnText?: string;
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