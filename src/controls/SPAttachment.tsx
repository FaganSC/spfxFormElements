import * as React from 'react';
import { useState/*, useEffect*/ } from "react";
import styles from '../common/FormFields.module.scss';
import { FieldActions, FieldLabel } from "../common";
import { ActionButton, IconButton } from '@fluentui/react/lib/components/Button';
import { Link } from '@fluentui/react/lib/components/Link';
import { getFileTypeIconProps } from '@fluentui/react-file-type-icons/lib/getFileTypeIconProps';
import { Icon, IIconProps } from '@fluentui/react/lib/Icon';

export interface ISPAttachmentProps {
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

export interface SPAttachedFiles {
    Name: string;
    ServerRelativeUrl: string;
}

export const SPAttachment: React.FunctionComponent<ISPAttachmentProps> = React.forwardRef<HTMLElement, ISPAttachmentProps>(
    (props, forwardedRef) => {
        const acceptFileTypes: string = "*";//"image/*"
        const _fieldActions: FieldActions = new FieldActions(props);
        const inputFile = React.useRef(null)

        const uploadIcon: IIconProps = { iconName: 'Upload' };
        //const iconProps = props.ReadOnly ? { iconName: 'Lock' } : null;
        const [Files, setFiles] = useState(_handleDataFormat);
        /*useEffect(() => {
            setFiles(_handleDataFormat);
        }, [_handleDataFormat]);*/

        function _handleDataFormat(): SPAttachedFiles[] {
            return [] as SPAttachedFiles[]
        }

        /*function _handleOnChange(file: any): void {
            let Files: any[] = this.state.Files;
            Files.push(file);
            props.onChange(Files);
        }*/

        function _handleOnRemove(fileName: any): void {
            props.onRemove(fileName);
        }

        /*function _handleOnError(msg: string): void {
            props.onError(msg);
        }*/
        const onButtonClick = () => {
            // `current` points to the mounted file input element
            inputFile.current.click();
        };

        const onChangeFile = (event: any) => {
            const filesList: any = event.target.files[0];
            console.log(filesList);
            const files: SPAttachedFiles[] = Files;
            files.push({
                Name: filesList.name,
                ServerRelativeUrl: null
            });
            setFiles(files);
        }

        const displayAttachedFiles = Files.forEach(file => {
            let extension: string = file.Name.split('.').pop();
            return (<span className={styles.File}>
                <Link href={file.ServerRelativeUrl} underline target='_blank'>
                    <Icon className={styles.Icon} {...getFileTypeIconProps({ extension: `${extension}`, size: 16, imageFileType: 'png' })} />
                    {file.Name}
                </Link>
                {!props.ReadOnly ? <IconButton onClick={() => { _handleOnRemove(file.Name); }} iconProps={{ iconName: 'Delete' }} title="Delete" ariaLabel="Delete" disabled={false} checked={true} /> : undefined}
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
                    <input multiple={false} onInputCapture={(e) => console.log(e.target)} onChange={(file) => onChangeFile(file)} type='file' id='file' ref={inputFile} style={{ display: 'none' }} accept={acceptFileTypes} />
                    <ActionButton onClick={onButtonClick} iconProps={uploadIcon} allowDisabledFocus disabled={false} checked={true}>
                        Add attachments
                    </ActionButton>
                </div>
            </div>
        );
    }
);