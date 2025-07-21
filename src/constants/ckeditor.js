/**
 * CKEditor configuration constants
 */

// Default toolbar configuration
export const DEFAULT_TOOLBAR = [
  'bold', 'italic', 'strikethrough',
  '|',
  'bulletedList', 'numberedList', 'outdent', 'indent', 'blockQuote',
  '|',
  'imageUpload', 'table', 'specialCharacters',
  '|',
  'link', 'unlink',
  '|',
  'maximize', 'sourceEditing',
  '|',
  'undo', 'redo'
];

// Default plugins to remove
export const DEFAULT_REMOVE_PLUGINS = [
  'CKFinderUploadAdapter', 
  'CKFinder', 
  'EasyImage'
];

// Image upload configuration
export const IMAGE_UPLOAD_CONFIG = {
  types: ['jpeg', 'png', 'gif', 'webp'],
  maxSize: 5 * 1024 * 1024, // 5MB
};

// Default editor dimensions
export const EDITOR_DIMENSIONS = {
  height: '200px',
  minHeight: '200px',
  maxHeight: '500px'
};

// Complete default configuration
export const DEFAULT_CKEDITOR_CONFIG = {
  toolbar: DEFAULT_TOOLBAR,
  removePlugins: DEFAULT_REMOVE_PLUGINS,
  image: {
    upload: IMAGE_UPLOAD_CONFIG
  },
  ...EDITOR_DIMENSIONS
};

// Minimal configuration (basic toolbar)
export const MINIMAL_CKEDITOR_CONFIG = {
  toolbar: ['bold', 'italic', 'link', 'unlink'],
  removePlugins: DEFAULT_REMOVE_PLUGINS,
  ...EDITOR_DIMENSIONS
};

// Full configuration (all features)
export const FULL_CKEDITOR_CONFIG = {
  toolbar: [
    ...DEFAULT_TOOLBAR,
    '|',
    'heading',
    'fontSize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'alignment',
    'horizontalLine',
    'pageBreak'
  ],
  removePlugins: DEFAULT_REMOVE_PLUGINS,
  image: {
    upload: IMAGE_UPLOAD_CONFIG,
    styles: [
      'alignLeft',
      'alignCenter', 
      'alignRight'
    ],
    resizeOptions: [
      {
        name: 'resizeImage:original',
        value: null,
        label: 'Original'
      },
      {
        name: 'resizeImage:50',
        value: '50',
        label: '50%'
      },
      {
        name: 'resizeImage:75',
        value: '75',
        label: '75%'
      }
    ]
  },
  ...EDITOR_DIMENSIONS
}; 