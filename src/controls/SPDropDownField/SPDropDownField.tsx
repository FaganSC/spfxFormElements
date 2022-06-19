import * as React from 'react';

import styles from '../../common/FormFields.module.scss';

import { ISPDropDownFieldProps, ISPDropDownFieldState } from ".";
import { FieldActions, FieldLabel } from "../../common";

import { Dropdown, IDropdownOption, TextField } from '@fluentui/react';

export class SPDropDownField extends React.Component<ISPDropDownFieldProps, ISPDropDownFieldState> {
    constructor(props) {
        super(props);
        this.handleDataFormat = this.handleDataFormat.bind(this);
        this.handleOnSingleChange = this.handleOnSingleChange.bind(this);
        this.handleOnMultiChange = this.handleOnMultiChange.bind(this);
        this.state = {
            selectedKey: this.handleDataFormat(),
            selectedKeys: this.handleArrayFormat()
        };
    }

    private handleDataFormat = (): string | number => {
        const { props } = this;
        return props.Data !== undefined
            && props.Data !== null
            && Object.keys(props.Data).length > 0
            && props.Data[props.FieldName] !== null
            ? props.Data[props.FieldName] : null;
    }

    private handleArrayFormat = (): string[] => {
        const { props } = this;
        return props.Data !== undefined
            && props.Data !== null
            && Object.keys(props.Data).length > 0
            && props.Data[props.FieldName] !== null
            ? props.Data[props.FieldName] : [];
    }

    private handleOnSingleChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
        const { props } = this;
        const DataObj: any = props.Data;
        let selectedKey = (item ? item.key : null);
        this.setState({ selectedKey: selectedKey });
        if (!selectedKey) {
            DataObj[props.FieldName] = null;
        } else {
            DataObj[props.FieldName] = selectedKey;
        }
        props.onChange(props.FieldName, DataObj);
    }

    private handleOnMultiChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
        const { props } = this;
        const { selectedKeys } = this.state;
        var DataObj: any = props.Data;
        let selected: string[] = [];
        if (item) {
            selected = item.selected ? [...selectedKeys, item.key as string] : selectedKeys.filter(key => key !== item.key);
        }
        this.setState({ selectedKeys: selected });
        DataObj[props.FieldName] = selected;
        props.onChange(props.FieldName, DataObj);
    }

    public componentDidMount = () => {
        //alert('Load');
    }

    public componentWillUnmount = () => {
        //alert('Unload');
    }

    public componentDidUpdate = (prevProps) => {
        const { props } = this;
        let _fieldActions: FieldActions = new FieldActions(props);
        if (!_fieldActions.isMultiSelect() && this.props.Data[this.props.FieldName] !== this.state.selectedKey) {
            this.setState({ selectedKey: this.handleDataFormat() });
        } else if (_fieldActions.isMultiSelect() && this.props.Data[this.props.FieldName] !== this.state.selectedKeys) {
            this.setState({ selectedKeys: this.handleArrayFormat() });
        }
    }

    public render(): JSX.Element {
        const { props } = this;
        const { selectedKey, selectedKeys } = this.state;
        const iconProps = props.ReadOnly ? { iconName: 'Lock' } : null;
        let _fieldActions: FieldActions = new FieldActions(props);
        let readyOnlyValue: string = "";
        if (_fieldActions.isMultiSelect()) {
            selectedKeys.map((key => {
                readyOnlyValue += _fieldActions.isReadOnly() && `${props.Options.filter((item => item.key === key))[0].text}, `;
            }));
            readyOnlyValue = readyOnlyValue.slice(0, readyOnlyValue.length - 2);
        } else {
            readyOnlyValue = _fieldActions.isReadOnly() && selectedKey && props.Options.filter((item => item.key === selectedKey))[0].text;
        }

        return (
            <div className={styles.fieldContainer}>
                <FieldLabel
                    Label={props.Label}
                    Required={_fieldActions.isRequired()}
                    UseIcon={_fieldActions.hasIcon()}
                    TipTool={_fieldActions.hasTipTool()}
                    IconName="TextField"
                />

                {!(_fieldActions.isMultiSelect()) && !(_fieldActions.isReadOnly()) &&
                    <Dropdown
                        placeholder="Select an option"
                        options={props.Options}
                        disabled={_fieldActions.isDisabled()}
                        className={_fieldActions.getClassNames()}
                        errorMessage={_fieldActions.getErrorMessage()}
                        onChange={(event, item) => this.handleOnSingleChange(event, item)}
                        selectedKey={selectedKey}
                    />}

                {(_fieldActions.isMultiSelect()) && !(_fieldActions.isReadOnly()) &&
                    <Dropdown
                        placeholder="Select an option"
                        multiSelect={true}
                        options={props.Options}
                        disabled={_fieldActions.isDisabled()}
                        className={_fieldActions.getClassNames()}
                        errorMessage={_fieldActions.getErrorMessage()}
                        onChange={(event, item) => this.handleOnMultiChange(event, item)}
                        selectedKeys={selectedKeys}
                    />}

                {(_fieldActions.isReadOnly()) &&
                    <TextField
                        readOnly={_fieldActions.isReadOnly()}
                        disabled={_fieldActions.isDisabled()}
                        className={_fieldActions.getClassNames()}
                        value={readyOnlyValue}
                        iconProps={iconProps}
                    />
                }
            </div>
        );
    }
}