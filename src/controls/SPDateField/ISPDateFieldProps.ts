import { DayOfWeek } from "office-ui-fabric-react/lib/Calendar";

export interface ISPDateFieldProps {
  Label: string;
  Data?: any;
  FieldName?: string;
  DateFormat?: string;
  MinDate?: Date;
  MaxDate?: Date;
  MonthPickerVisible?: boolean;
  FirstDayOfWeek?: DayOfWeek;
  ClassName?: string | string[];
  ReadOnly?: boolean;
  Disabled?: boolean;
  Required?: boolean | string[];
  Errors?: string[];
  UseIcon?: boolean;
  TipTool?: string;
  onChange?: any;
}