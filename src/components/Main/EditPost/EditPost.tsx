import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticleData } from '../../../helpers/FetchArticleData';
import { fetchTagListData } from '../../../helpers/FetchTagListData';
import { IPost } from '../../../interfaces/Post';
import { ITag } from '../../../interfaces/Tag';
import InfoText from '../InfoText/InfoText';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { decode } from 'html-entities';
import './EditPost.css';
import AuthContext from '../../../contexts/AuthContext';
import { handlePostUpdate } from '../../../helpers/handlePostUpdate';

export default function EditPost() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const id: string | undefined = params.id;
  const [tagList, setTagList] = useState<ITag[]>();
  const [article, setArticle] = useState<IPost>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showInfoText, setShowInfoText] = useState<boolean>(false);
  const [infoTextMessage, setInfoTextMessage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [articleComments, setArticleComments] = useState<string[]>([]);
  const [initialRender, setInitialRender] = useState<boolean>(true);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const decodedString = decode(article?.content);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (article) {
      handlePostUpdate(
        event,
        token,
        id,
        editorRef,
        selectedTags,
        articleComments,
        successfullSubmit,
        failedSubmit
      );
    }
  };

  const successfullSubmit = () => {
    setInfoTextMessage('Post updated successfully!!');
    setShowInfoText(true);
    const timeoutId = setTimeout(() => {
      navigate('/all');
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  const failedSubmit = () => {
    setInfoTextMessage('Something went wrong!');
    setShowInfoText(true);
    const timeoutId = setTimeout(() => {
      navigate('/all');
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  const handleTagCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (event.target.checked) {
      setSelectedTags([...selectedTags, value]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== value));
    }
  };

  useEffect(() => {
    fetchTagListData(setTagList, setLoading, setError);
    fetchArticleData(id, setArticle, setLoading, setError);
  }, [id]);

  useEffect(() => {
    if (initialRender && article) {
      setSelectedTags(article.tags.map((tag) => tag._id));
      setInitialRender(false);
    }
  }, [article, initialRender]);

  useEffect(() => {
    if (article) {
      setArticleComments(article.comments.map((comment) => comment._id));
    }
  }, [article]);

  useEffect(() => {
    const timeoutId = setTimeout(navigate, 3000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
  return (
    <main className="add-post_page">
      {showInfoText ? (
        <InfoText message={infoTextMessage} />
      ) : (
        <div className="add-post_container">
          {article && (
            <form onSubmit={handleSubmit}>
              <h1 className="add-post_heading">Add post</h1>
              <div className="tags-container">
                <label htmlFor="tags">Tags</label>
                <div className="create-post-tag-list">
                  {tagList &&
                    tagList?.map((tag) => (
                      <div key={tag._id} className="checkbox-container">
                        <input
                          type="checkbox"
                          id={tag.name}
                          name={tag.name}
                          value={tag._id}
                          defaultChecked={article.tags.some((t) => t._id === tag._id)}
                          onChange={(e) => handleTagCheckboxChange(e)}
                        />

                        <label htmlFor={tag.name}>{tag.name}</label>
                      </div>
                    ))}
                </div>
              </div>
              <div className="title-container">
                <h2>title:</h2>
                <input
                  type="text"
                  name="title"
                  defaultValue={article?.title}
                  onChange={(e) => setArticle({ ...article, title: e.target.value })}
                />
              </div>
              <div className="editor-container">
                <h2>content:</h2>
                <Editor
                  apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={decodedString}
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
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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
                        (
                          cb: (value: string, meta?: Record<string, any> | undefined) => void,
                          file: File
                        ) =>
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
              </div>
              <div className="create-post-publish-options">
                <div className="checkbox-container">
                  <input type="checkbox" id="publishPost" name="publishPost" />
                  <label htmlFor="publishPost">publish post when submitting</label>
                </div>
              </div>
              <button type="submit">Submit post</button>
            </form>
          )}
        </div>
      )}
    </main>
  );
}
