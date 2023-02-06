import React, { useContext } from 'react';
import ThemeContext from '../../../contexts/ThemeContext';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import Prism from 'prismjs';

interface ITinyMCEEditorProps {
  setEditorRef: (editor: TinyMCEEditor) => void;
  decodedContent?: string;
}

export default function ContentEditor({ setEditorRef, decodedContent }: ITinyMCEEditorProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      onInit={(_evt, editor: TinyMCEEditor) => {
        setEditorRef(editor);
      }}
      initialValue={decodedContent ? decodedContent : "What's todays topic?"}
      init={{
        height: 500,
        menubar: false,
        skin: theme === 'Default' || theme === 'Bright' ? 'oxide' : 'oxide-dark',
        content_css: theme === 'Default' || theme === 'Bright' ? 'default' : 'dark',
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
          'codesample'
        ],
        toolbar:
          'undo redo | blocks | ' +
          'codesample | bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | image | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'CSS', value: 'css' },
          { text: 'PHP', value: 'php' },
          { text: 'Ruby', value: 'ruby' },
          { text: 'Python', value: 'python' },
          { text: 'Java', value: 'java' },
          { text: 'C', value: 'c' },
          { text: 'C#', value: 'csharp' },
          { text: 'C++', value: 'cpp' }
        ],
        codesample_highlight: true,
        pre_process: (editor, el) => {
          Prism.highlightAllUnder(el);
        },
        file_picker_callback: (cb, value, meta) => {
          const createFileInput = () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            return input;
          };

          const handleFileSelected =
            (cb: (value: string, meta?: Record<string, any> | undefined) => void) =>
            (event: Event) => {
              if (event.target && event.target.files) {
                const file = event.target?.files[0];
                const reader = new FileReader();
                reader.onload = handleFileRead(cb, file);
                reader.readAsDataURL(file);
              }
            };

          const handleFileRead =
            (cb: (value: string, meta?: Record<string, any> | undefined) => void, file: File) =>
            (event: ProgressEvent<FileReader>) => {
              if (event.target) {
                const base64 = (event.target.result as string)?.split(',')[1];

                const blobCache = tinymce.activeEditor?.editorUpload.blobCache;
                const id = createBlobId();
                const blobInfo = blobCache.create(id, file, base64);

                blobCache.add(blobInfo);
                cb(blobInfo.blobUri(), { title: file.name });
              }
            };

          const createBlobId = () => {
            return 'blobid' + new Date().getTime();
          };
          const fileInput = createFileInput();
          fileInput.onchange = handleFileSelected(cb);
          fileInput.click();
        }
      }}
    />
  );
}
