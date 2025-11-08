import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'title',
      name: 'Panel Title',
      defaultValue: 'Top Support needs for Climate Action',
    })
    .addTextInput({
      path: 'subtitle',
      name: 'Subtitle',
      defaultValue: 'What help do communities need most for weather changes',
    })
    .addFieldNamePicker({
      path: 'fieldCategory',
      name: 'Category Field',
      description: 'Select the field for category names',
    })
    .addFieldNamePicker({
      path: 'fieldMentionsPercent',
      name: 'Mentions Percent Field',
    })
    .addFieldNamePicker({
      path: 'fieldMentionsCount',
      name: 'Mentions Percent Count',
    })
    .addFieldNamePicker({
      path: 'fieldKeywords',
      name: 'Keywords Field',
    })
    .addColorPicker({
      path: 'barColor',
      name: 'Bar Color',
      defaultValue: '#2f855a',
    });
});
