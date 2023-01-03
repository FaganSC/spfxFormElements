import { IChoiceGroupOption } from "@fluentui/react/lib/ChoiceGroup";
import { DropdownMenuItemType, IDropdownOption } from "@fluentui/react/lib/components/Dropdown";

export const dropdownNumberData: IDropdownOption[] = [
    { key: -1, text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 1, text: 'Apple' },
    { key: 2, text: 'Banana' },
    { key: 3, text: 'Orange', disabled: true },
    { key: 4, text: 'Grape' },
    { key: -2, text: '-', itemType: DropdownMenuItemType.Divider },
    { key: -3, text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 5, text: 'Broccoli' },
    { key: 6, text: 'Carrot' },
    { key: 7, text: 'Lettuce' },
  ];
  
  export const dropdownStringData: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' },
  ];
  
  export const radioVerticalChoices: IChoiceGroupOption[] = [
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' }
  ];
  
  export const radioHorizontalChoices: IChoiceGroupOption[] = [
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' }
  ];