import { Editor as TinyMCEEditor } from 'tinymce';
import { IComment } from '../interfaces/Comment';
import { ITag } from '../interfaces/Tag';

export const handlePostUpdate = async (
  event: React.FormEvent<HTMLFormElement>,
  token: String | null,
  id: String | undefined,
  editorRef: React.MutableRefObject<TinyMCEEditor | null>,
  selectedTags: string[] | [],
  comments: string[] | [],
  successfullSubmit: () => () => void,
  failedSubmit: () => () => void
) => {
  if (token) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const body = {
      title: formData.get('title'),
      content: editorRef.current ? editorRef.current.getContent() : '',
      tags: selectedTags,
      comments: comments,
      isPublished: formData.get('publishPost')
    };

    const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      const data = await response.json();
      successfullSubmit();
    } else {
      console.error(response.statusText);
      failedSubmit();
    }
  }
};
