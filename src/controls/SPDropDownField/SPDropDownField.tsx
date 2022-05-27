import * as React from 'react';
import { Dropdown, IDropdownOption, TextField } from '@fluentui/react';
import styles from '../../common/FormFields.module.scss';
import { FieldActions } from '../../common/FieldActions';
import { FieldLabel } from '../../common/FieldLabel';

export interface ISPDropDownFieldProps {
    Label: string;
    Options: IDropdownOption[];
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

export interface ISPDropDownFieldState {
    FieldsValue: string | number;
}

export class SPDropDownField extends React.Component<ISPDropDownFieldProps, ISPDropDownFieldState> {
    constructor(props) {
        super(props);
        this.handleDataFormat = this.handleDataFormat.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            FieldsValue: this.handleDataFormat()
        };
    }

    private handleDataFormat = (): string => {
        return this.props.Data !== undefined
            && this.props.Data !== null
            && Object.keys(this.props.Data).length > 0
            && this.props.Data[this.props.FieldName] !== null
            ? this.props.Data[this.props.FieldName] : null;
    }

    private handleOnChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
        const { props } = this;
        let FieldsValue = (item ? item.key : null);
        this.setState({ FieldsValue: FieldsValue });
        var DataObj: any = props.Data;
        if (!FieldsValue) {
            DataObj[props.FieldName] = null;
        } else {
            DataObj[props.FieldName] = FieldsValue;
        }
        props.onChange(props.FieldName, DataObj);
    }

    public componentDidMount = () => {
        //alert('Load');
    }

    public componentWillUnmount = () => {
        //alert('Unload');
    }

    public componentDidUpdate = (prevProps) => {
        if (this.props.Data[this.props.FieldName] !== prevProps.Data[this.props.FieldName]) {
            this.setState({ FieldsValue: this.handleDataFormat() });
        }
    }

    public render(): JSX.Element {
        const { props } = this;
        const { FieldsValue } = this.state;
        const iconProps = props.ReadOnly ? { iconName: 'Lock' } : null;
        let _fieldActions: FieldActions = new FieldActions(props);
        return (
            <div className={styles.fieldContainer}>
                <FieldLabel
                    Label={props.Label}
                    Required={_fieldActions.isRequired()}
                    UseIcon={_fieldActions.hasIcon()}
                    TipTool={_fieldActions.hasTipTool()}
                    IconName="TextField"
                />
                {!(_fieldActions.isReadOnly()) ?
                    <Dropdown
                        placeholder="Select an option"
                        multiSelect={false}
                        options={props.Options}
                        disabled={_fieldActions.isDisabled()}
                        className={_fieldActions.getClassNames()}
                        errorMessage={_fieldActions.getErrorMessage()}
                        onChange={(event, item) => this.handleOnChange(event, item)}
                        selectedKey={FieldsValue}
                    /> :
                    <TextField
                        readOnly={_fieldActions.isReadOnly()}
                        disabled={_fieldActions.isDisabled()}
                        className={_fieldActions.getClassNames()}
                        value={props.Options.filter((item => item.key === FieldsValue))[0].text}
                        iconProps={iconProps}
                    />
                }
            </div>
        );
    }
}