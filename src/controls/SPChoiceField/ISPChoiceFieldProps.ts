import { IChoiceGroupOption } from "@fluentui/react/lib/ChoiceGroup";
import { Layout } from ".";

export interface ISPChoiceFieldProps {
    Label: string;
    Data?: any;
    FieldName?: string;
    Choices: IChoiceGroupOption[];
    Layout?: Layout;
    ClassName?: string | string[];
    ReadOnly?: boolean;
    Disabled?: boolean;
    Required?: boolean | string[];
    Errors?: string[];
    UseIcon?: boolean;
    TipTool?: string;
    onChange?: any;
}