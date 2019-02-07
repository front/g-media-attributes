# Gutenberg JS Media Attributes
> A set of extensions for core media blocks in order to support Drupal's media attributes.


### Motivation

In order to fully support Drupal's file entity when handling images on Gutenberg editor, the <img /> tags on core media blocks need to have the `data-entity-uuid` and `data-entity-type` attributes.

The block resulting HTML must be something like this:

```
<figure class="wp-block-image">
  <img data-entity-uuid="f398bc3b-1c50-4394-bf80-3af0f72fef42" data-entity-type="file" src="..."
    alt="Picture" class="wp-image-1">
</figure>
```

The data-* attributes are provided by `api-fetch`'s upload method.

The following core blocks needed to be updated:

- core/image
- core/video
- core/media-text
- core/cover
- core/gallery


### Solution

The solution we found was to wrap the Edit and Save components with [Higher Order Components](https://reactjs.org/docs/higher-order-components.html)'s (HOC) that handle the fetching and printing of these media attributes.

```
settings.edit = editWithMediaAttrs(settings.edit);
settings.save = saveWithMediaAttrs(settings.save);
```

When an image is selected, the Edit HOC captures that event and fecthes the additional data required from the API.

On save, the Save HOC updates the rendered tree with the necessary attributes for each media element.


## How to use

Install the package from NPM.

```
$ npm install @frontkom/g-media-attributes
```

Add to the editor before the core blocks are loaded:

```
import '@frontkom/g-media-attributes';
```


## License
[MIT](./LICENSE)
