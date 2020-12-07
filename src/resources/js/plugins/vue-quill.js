import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';

import 'quill/dist/quill.core.css'; // import styles
import 'quill/dist/quill.snow.css'; // for snow theme
import 'quill/dist/quill.bubble.css'; // for bubble theme

Vue.use(VueQuillEditor, {
  theme: 'snow',
  placeholder: '',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  }
});
