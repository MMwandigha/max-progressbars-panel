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
      defaultValue: '#2f855a',
    });
});
