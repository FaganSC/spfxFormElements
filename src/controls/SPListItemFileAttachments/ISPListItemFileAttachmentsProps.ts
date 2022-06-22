import { IAttachedFile } from "../../SPListItemFileAttachments";

export interface ISPListItemFileAttachmentsProps {
    Label?: string;
    Files: IAttachedFile[];
    DocumentType?: string;
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