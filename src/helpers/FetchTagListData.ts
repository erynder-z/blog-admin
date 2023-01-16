export const fetchTagListData = async (
  setTagList: Function,
  setLoading: Function,
  setError: Function
) => {
  try {
    const res = await fetch('http://localhost:8000/api/tags');
    const data = await res.json();
    setTagList(data.tag_list);
  } catch (err: any) {
    setError(err);
  }
  setLoading(false);
};
