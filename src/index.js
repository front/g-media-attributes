
import { blocks } from 'wp';
const { registerBlockType, unregisterBlockType } = blocks;

import { name, settings } from './image';

setTimeout(() => {
  unregisterBlockType(name);
  registerBlockType(name, settings);
});
