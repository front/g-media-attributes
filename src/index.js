
import { hooks } from 'wp';
import { editWithDataAttrs, saveWithDataAttrs } from './override';


hooks.addFilter('blocks.registerBlockType', 'g-js.media.register', (settings, type) => {
  if(
    type === 'core/image' ||
    type === 'core/video' ||
    type === 'core/media-text' ||
    type === 'core/cover'
  ) {
    // Set a new attribute
    settings.attributes.dataAttrs = {
      type: 'object',
      default: {},
    };

    const trackField = type === 'core/media-text' ? 'mediaId' : 'id';

    // Override the edit and save components
    settings.edit = editWithDataAttrs(settings.edit, trackField);
    settings.save = saveWithDataAttrs(settings.save);
  }

  if(type === 'core/gallery') {
    // TODO:
  }

  return settings;
});
