
import { element } from 'wp';
const { Component } = element;

import { getMediaAttrs } from './override';


export function editWithMultipleMediaAttrs (EditComponent) {
  return class extends Component {

    componentDidMount () {
      const { attributes } = this.props;
      this.ids = attributes && attributes.ids && attributes.ids.toString();
    }

    async componentDidUpdate () {
      const { attributes } = this.props;
      const ids = attributes && attributes.ids && attributes.ids.toString();
      if(ids !== this.ids) {
        this.ids = ids;
        const { ids: newIds, mediaAttrs: oldAttrs } = attributes;
        const mediaAttrs = {};

        // Fetch the media attributes for new images
        for(const id of newIds) {
          if(id) {
            mediaAttrs[id] = oldAttrs[id] || await getMediaAttrs(id);
          }
        }

        // Save the media attributes
        this.props.setAttributes({ mediaAttrs });
      }
    }

    render () {
      return <EditComponent { ...this.props } />;
    }
  };
}


export function updateGalleryTree (node, attrs) {
  if(!node || !node.props) {
    return;
  }
  const { type, props } = node;
  if((type === 'img' || type === 'video') && props['data-id']) {
    const mediaAttrs = attrs[props['data-id']] || {};
    node.props = {
      ...props, ...mediaAttrs,
    };
  }

  const { children } = props;
  if(children && children.length) {
    for(const item of children) {
      updateGalleryTree(item, attrs);
    }
  }
  else {
    updateGalleryTree(children, attrs);
  }
}
