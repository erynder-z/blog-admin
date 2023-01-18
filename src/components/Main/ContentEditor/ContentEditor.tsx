import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

interface ITinyMCEEditorProps {
  setEditorRef: (editor: TinyMCEEditor) => void;
  decodedContent?: string;
}

export default function ContentEditor({ setEditorRef, decodedContent }: ITinyMCEEditorProps) {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      onInit={(evt, editor) => {
        setEditorRef(editor);
      }}
      initialValue={decodedContent ? decodedContent : "What's todays topic?"}
      init={{
        height: 500,
        menubar: false,
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
          'wordcount'
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | image | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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
