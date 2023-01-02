const ErrorMsg: string = "Field is required";

export class FieldActions {
    public constructor(protected props: any) {
        //console.log(props);
    }

    public isControlled = ():boolean =>{
        if (this.props.Value === undefined && this.props.Data === undefined) {
            return false;
        } else {
            return true;
        }
    }

    public isRequired = (): boolean => {
        if (this.props.Required !== undefined) {
            if (typeof (this.props.Required) === 'boolean') {
                return this.props.Required;
            } else {
                let returnValue: boolean = false;
                this.props.Required.map(async (field: string) => {
                    if (field === this.props.FieldName) {
                        returnValue = true;
                    }
                });
                return returnValue;
            }
        } else {
            return false;
        }
    }

    public isDisabled = (): boolean => {
        if (this.props.Disabled !== undefined) {
            return this.props.Disabled;
        } else {
            return false;
        }
    }

    public isReadOnly = (): boolean => {
        if (this.props.ReadOnly !== undefined) {
            return this.props.ReadOnly;
        } else {
            return false;
        }
    }

    public isMultiSelect = (): boolean => {
        if (this.props.MultiSelect !== undefined) {
            return this.props.MultiSelect;
        } else {
            return false;
        }
    }

    public getDecimalScale = (): number => {
        if (this.props.DecimalScale !== undefined) {
            return this.props.DecimalScale;
        } else {
            return 0;
        }
    }

    public getPlaceholderText = (): string => {
        if (this.props.PlaceHolder !== undefined) {
            return this.props.PlaceHolder;
        } else {
            return null;
        }
    }

    public getErrorMessage = (): string => {
        if (this.props.Errors !== undefined) {
            return ErrorMsg;
            //return this.props.Errors.filter((field => field === this.props.FieldName)).length > 0 ? ErrorMsg : null;
        } else {
            return null;
        }
    }

    public getClassNames = (AddedClass?: string): string => {
        if (AddedClass !== undefined) {
            if (Array.isArray(this.props.ClassName)) {
                const classes: string[] = this.props.ClassName;
                classes.push(AddedClass);
                return classes.join(' ');
            } else {
                const classes: string[] = [];
                classes.push(this.props.ClassName);
                classes.push(AddedClass);
                return classes.join(' ');
            }
        } else {
            if (Array.isArray(this.props.ClassName)) {
                return this.props.ClassName.join(' ');
            } else {
                return this.props.ClassName;
            }
        }
    }

    public hasIcon = (): boolean => {
        if (this.props.UseIcon !== undefined) {
            return this.props.UseIcon;
        } else {
            return false;
        }
    }

    public hasTipTool = (): string => {
        if (this.props.TipTool !== undefined) {
            return this.props.TipTool;
        } else {
            return null;
        }
    }

    public getRowCount = (): number => {
        if (this.props.Rows !== undefined) {
            return this.props.Rows;
        } else {
            return 1;
        }
    }
}