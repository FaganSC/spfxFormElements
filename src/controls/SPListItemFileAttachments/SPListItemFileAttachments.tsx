import * as React from 'react';
import styles from '../../common/FormFields.module.scss';

import { IAttachedFile, IFileStatus, ISPListItemFileAttachmentsProps, ISPListItemFileAttachmentsState } from ".";
import { FieldActions, FieldLabel } from "../../common";

import { FilePicker } from 'react-file-picker';
import { ActionButton, Icon, IconButton, IIconProps, Link } from '@fluentui/react';
import { getFileTypeIconProps, initializeFileTypeIcons } from '@fluentui/react-file-type-icons';

const uploadIcon: IIconProps = { iconName: 'Upload' };

export class SPListItemFileAttachments extends React.Component<ISPListItemFileAttachmentsProps, ISPListItemFileAttachmentsState> {
    constructor(props) {
        super(props);
        initializeFileTypeIcons(undefined);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            Files: props.File ? props.File : []
        };
    }

    private handleOnChange = (file: any) => {
        const { props } = this;
        const { Files } = this.state;
        const reader = new FileReader();
        let newFileName: string = props.DocumentType ? props.DocumentType + " - " + file.name : file.name;
        let extension: string = file.name.split('.').pop();
        let fileFound: number = Files.filter((attachement => attachement.FileName === newFileName)).length;
        if (fileFound > 0) {
            let fileCount: number = 1;
            let orignalName: string = newFileName;
            do {
                newFileName = `${orignalName.replace(`.${extension}`, '')} (${fileCount}).${extension}`;
                fileCount++;
                fileFound = Files.filter((attachement => attachement.FileName === newFileName)).length;
            } while (fileFound > 0);
        }

        let attachements: IAttachedFile[] = Files;
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            let attachement: IAttachedFile = {} as IAttachedFile;
            attachement.FileName = newFileName;
            attachement.FileContent = reader.result;
            attachement.FileStatus = IFileStatus.PendingUpload;
            attachement.FileType = props.DocumentType ? props.DocumentType : undefined;
            attachements.push(attachement);
            this.setState({ Files: attachements });
        };
        this.setState({ Files: attachements });
        props.onChange(attachements);
    }

    private handleOnRemove = (attachedFileName: any) => {
        const { props } = this;
        const { Files } = this.state;
        let returnFiles: IAttachedFile[] = [];
        Files.map((File: IAttachedFile) => {
            if (File.FileName === attachedFileName) {
                if (File.FileStatus === IFileStatus.Uploaded) {
                    let attachement: IAttachedFile = {} as IAttachedFile;
                    attachement.FileName = File.FileName;
                    attachement.FileContent = File.FileContent;
                    attachement.FileStatus = IFileStatus.PendingRemoval;
                    returnFiles.push(attachement);
                }
            } else {
                returnFiles.push(File);
            }
        });
        this.setState({ Files: returnFiles });
        props.onRemove(returnFiles);
    }

    private handleOnError = (msg: string) => {
        const { props } = this;
        props.onError(msg);
    }

    public componentDidMount = () => {
        //alert('Load');
    }

    public componentWillUnmount = () => {
        //alert('Unload');
    }

    public componentDidUpdate = (prevProps) => {
        const { props } = this;
        if(props.Files !== this.state.Files){
            this.setState({Files: props.Files});
        }
    }

    public render(): JSX.Element {
        const { props } = this;
        const iconProps = props.ReadOnly ? { iconName: 'Lock' } : null;
        let _fieldActions: FieldActions = new FieldActions(props);
        const displayAttachedFiles = this.state.Files
            .filter((file => file.FileType === props.DocumentType))
            .map((file: any) => {
                let extension: string = file.FileName.split('.').pop();
                return (<span className={styles.File}>
                    <Link href={file.ServerRelativeUrl} underline target='_blank'>
                        <Icon className={styles.Icon}
                            {...getFileTypeIconProps({ extension: `${extension}`, size: 16, imageFileType: 'png' })} />
                        {file.FileName}
                    </Link>
                    {!props.ReadOnly ?
                        <IconButton
                            onClick={() => { this.handleOnRemove(file.FileName); }}
                            iconProps={{ iconName: 'Delete' }}
                            title="Delete"
                            ariaLabel="Delete"
                            disabled={false}
                            checked={true} />
                        : undefined}
                </span>);
            });

        return (
            <div className={styles.fieldContainer}>
                <FieldLabel
                    Label={props.Label ? props.Label : "Attachment(s)"}
                    Required={_fieldActions.isRequired()}
                    UseIcon={_fieldActions.hasIcon()}
                    TipTool={_fieldActions.hasTipTool()}
                    IconName="TextField"
                />
                <div className={styles.FilePicker}>
                    <FilePicker
                        maxSize={"10Mb"}
                        onChange={(file) => this.handleOnChange(file)}
                        onError={(errMsg) => this.handleOnError(errMsg)} >
                        <ActionButton
                            iconProps={uploadIcon}
                            allowDisabledFocus
                            disabled={false}
                            checked={true}>
                            Add attachments
                        </ActionButton>
                    </FilePicker>
                </div>
                <span className={styles.Files}>{displayAttachedFiles}</span>
            </div>
        );
    }
}