export const fetchTagListData = async (
  setTagList: Function,
  setLoading: Function,
  setError: Function
) => {
  try {
    const serverURL = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverURL}/api/tags`);
    if (res.ok) {
      const data = await res.json();
      setTagList(data.tag_list);
    } else {
      throw new Error(`Server returned ${res.status} ${res.statusText}`);
    }
  } catch (err: any) {
    setError(err);
  }

  setLoading(false);
};
