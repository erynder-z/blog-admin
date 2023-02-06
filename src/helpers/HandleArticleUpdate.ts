import { Editor as TinyMCEEditor } from 'tinymce';

export const handleArticleUpdate = async (
  event: React.FormEvent<HTMLFormElement>,
  token: String | null,
  id: String | undefined,
  editorRef: React.MutableRefObject<TinyMCEEditor | null>,
  selectedTags: string[] | [],
  comments: string[] | [],
  successfulSubmit: () => () => void,
  failedSubmit: (error: any) => void
) => {
  if (token) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const body = {
      title: formData.get('title'),
      content: editorRef.current ? editorRef.current.getContent() : '',
      tags: selectedTags,
      comments: comments,
      isPublished: formData.get('publishArticle')
    };

    const serverURL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(`${serverURL}/api/admin/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      const data = await response.json();
      successfulSubmit();
    } else {
      console.error(response.statusText);
      failedSubmit(response.statusText);
    }
  }
};
