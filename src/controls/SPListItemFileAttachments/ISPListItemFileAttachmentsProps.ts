export interface ISPListItemFileAttachmentsProps {
    Label?: string;
    Files: any[];
    ClassName?: string | string[];
    ReadOnly?: boolean;
    Disabled?: boolean;
    Required?: boolean | string[];
    Errors?: string[];
    UseIcon?: boolean;
    TipTool?: string;
    onChange?: any;
    onError?: any;
    onRemove?: any;
}