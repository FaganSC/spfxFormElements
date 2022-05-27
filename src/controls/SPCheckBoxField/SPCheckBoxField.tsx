import * as React from 'react';
import { Checkbox, Icon, mergeStyles } from '@fluentui/react';
import styles from '../../common/FormFields.module.scss';
import { FieldActions } from '../../common/FieldActions';
import { FieldLabel } from '../../common/FieldLabel';

export interface ISPCheckBoxFieldProps {
    Label: string;
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

export interface ISPCheckBoxFieldState {
    FieldsValue: boolean;
}

export class SPCheckBoxField extends React.Component<ISPCheckBoxFieldProps, ISPCheckBoxFieldState> {
    constructor(props) {
        super(props);
        this.handleDataFormat = this.handleDataFormat.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            FieldsValue: this.handleDataFormat()
        };
    }

    private handleDataFormat = (): boolean => {
        return this.props.Data !== undefined
            && this.props.Data !== null
            && Object.keys(this.props.Data).length > 0
            && this.props.Data[this.props.FieldName] !== null
            ? this.props.Data[this.props.FieldName] : false;
    }

    private handleOnChange = (event: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
        const { props } = this;
        let FieldsValue = (checked ? checked : false);
        this.setState({ FieldsValue: FieldsValue });
        var DataObj: any = props.Data;
        DataObj[props.FieldName] = FieldsValue;
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
        const readonlyIcon = FieldsValue ? "BoxCheckmarkSolid" : "Checkbox";
        let _fieldActions: FieldActions = new FieldActions(props);
        const iconClass = mergeStyles({
            fontSize: 20
        });
        const iconCheckedClass = FieldsValue && mergeStyles({
            color: "#0078d4"
        });
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
                    <Checkbox
                        checked={FieldsValue}
                        className={_fieldActions.getClassNames()}
                        disabled={_fieldActions.isDisabled()}
                        onChange={(event, checked) => this.handleOnChange(event, checked)}
                    /> :
                    <div className={styles.readOnly}>
                        <Icon className={mergeStyles(iconClass, iconCheckedClass, styles.fieldIcon)} iconName={readonlyIcon} />
                        <Icon className={mergeStyles(styles.lockIcon,styles.fieldIcon)} iconName={"Lock"} />
                    </div>
                }
            </div>
        );
    }
}