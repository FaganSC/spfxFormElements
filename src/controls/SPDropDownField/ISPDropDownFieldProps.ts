import { IDropdownOption } from "@fluentui/react/lib/Dropdown";

export interface ISPDropDownFieldProps {
    Label: string;
    Options: IDropdownOption[];
    MultiSelect?: boolean;
    Data?: any;
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