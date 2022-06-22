export enum IFileStatus {
    PendingUpload = "Pending Upload",
    PendingRemoval = "Pending Removal",
    Uploaded = "Uploaded"
}

export interface IAttachedFile {
    FileName: string;
    FileContent: any;
    ServerRelativeUrl?: string;
    FileStatus: IFileStatus;
    FileType?: string;
}

export interface ISPListItemFileAttachmentsState {
    Files: IAttachedFile[];
}