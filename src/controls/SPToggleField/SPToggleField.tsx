import * as React from 'react';
import styles from '../../common/FormFields.module.scss';

import { ISPToggleFieldProps, ISPToggleFieldState } from ".";
import { FieldActions, FieldLabel } from "../../common";

import { Icon, mergeStyles, Toggle } from '@fluentui/react';

export class SPToggleField extends React.Component<ISPToggleFieldProps, ISPToggleFieldState> {
    constructor(props) {
        super(props);
        this.handleDataFormat = this.handleDataFormat.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getOffText = this.getOffText.bind(this);
        this.getOnText = this.getOnText.bind(this);
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

    private handleOnChange = (event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
        const { props } = this;
        let FieldsValue = (checked ? checked : false);
        this.setState({ FieldsValue: FieldsValue });
        var DataObj: any = props.Data;
        DataObj[props.FieldName] = FieldsValue;
        props.onChange(props.FieldName, DataObj);
    }

    private getOnText(): string {
        if (this.props.OnText !== undefined) {
            return this.props.OnText;
        } else {
            return "On";
        }
    }

    private getOffText(): string {
        if (this.props.OffText !== undefined) {
            return this.props.OffText;
        } else {
            return "Off";
        }
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
        const readonlyIcon = FieldsValue ? "ToggleRight" : "ToggleLeft";
        let _fieldActions: FieldActions = new FieldActions(props);
        const iconClass = mergeStyles({
            fontSize: 40,
            lineHeight: 20
        });
        const iconTrueClass = FieldsValue && mergeStyles({
            color: "#0078d4"
        });
        return (
            <div className={styles.fieldContainer}>
                <FieldLabel
                    Label={props.Label}
                    Required={_fieldActions.isRequired()}
                    UseIcon={_fieldActions.hasIcon()}
                    TipTool={_fieldActions.hasTipTool()}
                    IconName="ToggleRight"
                />
                {!(_fieldActions.isReadOnly()) ?
                    <Toggle
                        checked={FieldsValue}
                        className={_fieldActions.getClassNames()}
                        disabled={_fieldActions.isDisabled()}
                        onText={this.getOnText()}
                        offText={this.getOffText()}
                        onChange={(event, checked) => this.handleOnChange(event, checked)}
                    /> :
                    <div className={styles.readOnly}>
                        <Icon className={mergeStyles(iconClass, iconTrueClass, styles.fieldIcon)} iconName={readonlyIcon} />
                        <Icon className={mergeStyles(styles.lockIcon,styles.fieldIcon)} iconName={"Lock"} />
                    </div>
                }
            </div>
        );
    }
}