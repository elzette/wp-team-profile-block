const attributes = {
  heading: {
    type: 'string',
    source: 'html',
    selector: 'h3',
  },
  bio: {
      type: 'array',
      source: 'children',
      selector: '.bio-content',
  },
  textAlignment: {
      type: 'string',
  },
  highContrast: {
    type: 'boolean',
    default: false,
  },
  blockBorderColor: {
    type: 'string',
    default: '#d3d3d3'
  },
  blockBackgroundColor: {
    type: 'string',
    default: '#fff'
  },
  blockHeadingColor: {
    type: 'string',
    default: '#0073aa'
  },
  rangeControl: {
    type: 'number',
    default: '2'
  },
  emailAddress: {
    type: 'string'
  },
  linkedIn: {
    type: 'string'
  },
  twitter: {
    type: 'string'
  },
  imgURL: {
    type: 'string',
    source: 'attribute',
    attribute: 'src',
    selector: 'img',
  },
  imgID: {
      type: 'number',
  },
  imgAlt: {
      type: 'string',
      source: 'attribute',
      attribute: 'alt',
      selector: 'img',
  },
  imageShape: {
    type: 'boolean',
    default: false,
  }
};

export default attributes;
