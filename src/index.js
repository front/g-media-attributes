
import { hooks } from 'wp';
import { editWithMediaAttrs, saveWithMediaAttrs } from './override';
import { editWithMultipleMediaAttrs, updateGalleryTree } from './gallery';


hooks.addFilter('blocks.registerBlockType', 'g-js.media.register', (settings, type) => {
  if(
    type === 'core/image' ||
    type === 'core/video' ||
    type === 'core/media-text' ||
    type === 'core/cover'
  ) {
    // Set a new attribute
    settings.attributes.mediaAttrs = {
      type: 'object',
      default: {},
    };

    const trackField = type === 'core/media-text' ? 'mediaId' : 'id';

    // Override the edit and save components
    settings.edit = editWithMediaAttrs(settings.edit, trackField);
    settings.save = saveWithMediaAttrs(settings.save);
  }

  if(type === 'core/gallery') {
    // Set a new attribute
    settings.attributes.mediaAttrs = {
      type: 'object',
      default: {},
    };

    // Override the edit and save components
    settings.edit = editWithMultipleMediaAttrs(settings.edit);
    settings.save = saveWithMediaAttrs(settings.save, updateGalleryTree);
  }

  return settings;
});
