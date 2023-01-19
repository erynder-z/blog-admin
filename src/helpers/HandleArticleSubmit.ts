import { Editor as TinyMCEEditor } from 'tinymce';

export const handleArticleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  token: String | null,
  editorRef: React.MutableRefObject<TinyMCEEditor | null>,
  selectedTags: string[],
  successfullSubmit: () => () => void,
  failedSubmit: (error: any) => void
) => {
  if (token) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const body = {
      title: formData.get('title'),
      content: editorRef.current ? editorRef.current.getContent() : '',
      tags: selectedTags
    };

    const response = await fetch('http://localhost:8000/api/articles', {
      method: 'POST',
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
      failedSubmit(response.statusText);
    }
  }
};
