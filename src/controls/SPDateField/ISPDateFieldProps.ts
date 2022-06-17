export interface ISPDateFieldProps {
    Label: string;
    Data?: any;
    FieldName?: string;
    DateFormat?: string;
    ClassName?: string | string[];
    ReadOnly?: boolean;
    Disabled?: boolean;
    Required?: boolean | string[];
    Errors?: string[];
    UseIcon?: boolean;
    TipTool?: string;
    onChange?: any;
  }