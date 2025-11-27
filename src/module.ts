import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'title',
      name: 'Panel Title',
      description: 'Provide a title for your panel',
    })
    .addTextInput({
      path: 'subtitle',
      name: 'Subtitle',
      description: 'Provide a subtitle or description for your panel',
    })
    .addFieldNamePicker({
      path: 'fieldCategory',
      name: 'Category Field',
      description: 'Select the field for category names',
    })
    .addFieldNamePicker({
      path: 'fieldDescription',
      name: 'Category Description',
      description: 'Select the description field'
    })
    .addFieldNamePicker({
      path: 'fieldMentionsCount',
      name: 'Mentions Count Field',
      description: 'Select the count field',
    })
    .addFieldNamePicker({
      path: 'fieldMentionsPercent',
      name: 'Mentions Percent Field',
      description: 'Select the percentage field',
    })
    .addFieldNamePicker({
      path: 'fieldKeywords',
      name: 'Keywords Field',
      description: 'Select the keywords field',  
    })
    .addColorPicker({
      path: 'barColor',
      name: 'Bar Color',
      defaultValue: 'green',
    })
    .addBooleanSwitch({
      path: 'showNumbering',
      name: 'Show numbering',
      description: 'Toggle whether to show numbers (1., 2., etc.) before each category',
      defaultValue: false,
    })
    .addNumberInput({
      path: 'decimalPlaces',
      name: 'Decimal places',
      description: 'Set how many decimal places to display for percentages (max 10)',
      settings: {
        min: 0,
        max: 10,
        step: 1,
      },
      defaultValue: 1,
    });
});
