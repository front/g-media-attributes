
import { element, apiFetch } from 'wp';
const { Component } = element;


async function getMediaAttrs (id) {
  const media = id && await apiFetch({ path: `/wp/v2/media/${id}` });

  if(media && media.data) {
    return Object.keys(media.data).reduce((d, k) => {
      d[`data-${k.replace(/_/g, '-')}`] = media.data[k];
      return d;
    }, {});
  }
  return {};
}


export function editWithDataAttrs (EditComponent) {
  return class extends Component {

    componentDidMount () {
      this.id = this.props.attributes && this.props.attributes.id;
    }

    async componentDidUpdate () {
      const id = this.props.attributes && this.props.attributes.id;
      if(id !== this.id) {
        this.id = id;
        const dataAttrs = await getMediaAttrs(this.id);
        this.props.setAttributes({ dataAttrs });
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
  if(type === 'img') {
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


export function saveWithDataAttrs (saveFunc) {
  return function (props) {
    const dataAttrs = (props && props.attributes && props.attributes.dataAttrs) || {};
    const tree = saveFunc(props);
    updateTree(tree, dataAttrs);
    return tree;
  };
}
