import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import './AddPostPage.css';
import { ITag } from '../../../interfaces/Tag';

interface Props {
  token: string | null;
}

export default function AddPostPage({ token }: Props) {
  const [tagList, setTagList] = useState<ITag[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (token) {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const body = {
        ...Object.fromEntries(formData),
        title: formData.get('title'),
        text: editorRef.current ? editorRef.current.getContent() : ''
      };

      const response = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error(response.statusText);
      }
    }
  };

  const fetchTagListData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/tags');
      const data = await res.json();
      setTagList(data.tag_list);
    } catch (err: any) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTagListData();
  }, []);

  const editorRef = useRef<TinyMCEEditor | null>(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <main className="add-post_page">
      <div className="add-post_container">
        <form onSubmit={handleSubmit}>
          <h1 className="add-post_heading">Add post</h1>
          <div className="tags-container">
            <label htmlFor="tags">Tags</label>
            <div className="create-post-tag-list">
              {tagList?.map((tag) => (
                <div key={tag._id} className="checkbox-container">
                  <input type="checkbox" id={tag.name} name={tag.name} value={tag._id} />
                  <label htmlFor={tag.name}>{tag.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="title-container">
            <h2>title:</h2>
            <input type="text" name="title" />
          </div>
          <div className="editor-container">
            <h2>content:</h2>
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
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
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          </div>
          <button type="submit">Submit post</button>
        </form>
      </div>
    </main>
  );
}
