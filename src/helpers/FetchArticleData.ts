export const fetchArticleData = async (
  id: string | undefined,
  setArticle?: Function,
  setLoading?: Function,
  setError?: Function
) => {
  try {
    const res = await fetch(`http://localhost:8000/api/posts/${id}`);
    const data = await res.json();
    if (setArticle) {
      setArticle(data.post);
    }
  } catch (err: any) {
    if (setError) {
      setError(err);
    }
  }
  if (setLoading) {
    setLoading(false);
  }
};
