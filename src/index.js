
import { hooks } from 'wp';
import { editWithDataAttrs, saveWithDataAttrs } from './override';


hooks.addFilter('blocks.registerBlockType', 'gjs.image.register', (settings, type) => {
  if(type === 'core/image') {
    settings.attributes.dataAttrs = {
      type: 'object',
      default: {},
    };
    settings.edit = editWithDataAttrs(settings.edit);
    settings.save = saveWithDataAttrs(settings.save);
  }
  return settings;
});
