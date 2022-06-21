import * as React from 'react';
import styles from '../../common/FormFields.module.scss';

import { ISPListItemFileAttachmentsProps, ISPListItemFileAttachmentsState } from ".";
import { FieldActions, FieldLabel } from "../../common";

import { FilePicker } from 'react-file-picker';
import { ActionButton, Icon, IconButton, IIconProps, Link } from '@fluentui/react';
import { getFileTypeIconProps, FileIconType, initializeFileTypeIcons } from '@fluentui/react-file-type-icons';

const uploadIcon: IIconProps = { iconName: 'Upload' };

export class SPListItemFileAttachments extends React.Component<ISPListItemFileAttachmentsProps, ISPListItemFileAttachmentsState> {
    constructor(props) {
        super(props);
        initializeFileTypeIcons(undefined);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            Files: props.Files
        };
    }

    private handleOnChange = (file: any) => {
        const { props } = this;
        let Files: any[] = this.state.Files;
        Files.push(file);
        props.onChange(Files);
    }

    private handleOnRemove = (fileName: any) => {
        const { props } = this;
        props.onRemove(fileName);
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

    }

    public render(): JSX.Element {
        const { props } = this;
        const iconProps = props.ReadOnly ? { iconName: 'Lock' } : null;
        let _fieldActions: FieldActions = new FieldActions(props);
        const displayAttachedFiles = this.state.Files.map((file: any) => {
            let extension: string = file.name.split('.').pop();
            return (<span className={styles.File}>
                <Link href={file.ServerRelativeUrl} underline target='_blank'>
                    <Icon className={styles.Icon} {...getFileTypeIconProps({ extension: `${extension}`, size: 16, imageFileType: 'png' })} />
                    {file.name}
                </Link>
                {!props.ReadOnly ? <IconButton onClick={() => { this.handleOnRemove(file.name); }} iconProps={{ iconName: 'Delete' }} title="Delete" ariaLabel="Delete" disabled={false} checked={true} /> : undefined}
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
                <span className={styles.Files}>{displayAttachedFiles}</span>
                <div className={styles.FilePicker}>
                    <FilePicker maxSize={"10Mb"} onChange={(file) => this.handleOnChange(file)} onError={(errMsg) => this.handleOnError(errMsg)} >
                        <ActionButton iconProps={uploadIcon} allowDisabledFocus disabled={false} checked={true}>
                            Add attachments
                        </ActionButton>
                    </FilePicker>
                </div>
            </div>
        );
    }
}