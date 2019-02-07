
import { element, apiFetch } from 'wp';
const { Component } = element;


async function getMediaAttrs (id) {
  const media = id && await apiFetch({ path: `/wp/v2/media/${id}` });

  if(media && media.data) {
    return Object.keys(media.data).reduce((d, key) => {
      d[`data-${key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`] = media.data[key];
      return d;
    }, {});
  }
  return {};
}


export function editWithMediaAttrs (EditComponent, trackField = 'id') {
  return class extends Component {

    componentDidMount () {
      this.id = this.props.attributes && this.props.attributes[trackField];
    }

    async componentDidUpdate () {
      const id = this.props.attributes && this.props.attributes[trackField];
      if(id !== this.id) {
        this.id = id;
        const mediaAttrs = await getMediaAttrs(this.id);
        this.props.setAttributes({ mediaAttrs });
      }
    }

    render () {
      return <EditComponent { ...this.props } />;
    }
  };
}


function updateTree (node, attrs) {
  if(!node || !node.props) {
    return;
  }
  const { type, props } = node;
  if(type === 'img' || type === 'video' || (props.style && props.style.backgroundImage)) {
    node.props = {
      ...props, ...attrs,
    };
  }

  const { children } = props;
  if(children && children.length) {
    for(const item of children) {
      updateTree(item, attrs);
    }
  }
  else {
    updateTree(children, attrs);
  }
}


export function saveWithMediaAttrs (saveFunc) {
  return function (props) {
    const mediaAttrs = (props && props.attributes && props.attributes.mediaAttrs) || {};
    const tree = saveFunc(props);
    updateTree(tree, mediaAttrs);
    return tree;
  };
}
