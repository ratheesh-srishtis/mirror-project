import { uploadImage } from "./publicApi";
// Custom Upload Adapter for CKEditor
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(file => new Promise((resolve, reject) => {
      uploadImage(file)
        .then(response => {
          resolve({ default: response.data.url });
        })
        .catch(error => {
          reject(error);
        });
    }));
  }

  abort() {}
}

// Plugin to register the upload adapter
export function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export default MyUploadAdapter;