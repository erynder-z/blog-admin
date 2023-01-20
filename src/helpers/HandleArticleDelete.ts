export const handleArticleDelete = async (
  token: String | null,
  id: String | undefined,
  successfullSubmit: () => () => void,
  failedSubmit: (error: any) => void
) => {
  if (token) {
    const response = await fetch(`http://localhost:8000/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
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
