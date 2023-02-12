export const handleTagUpdateSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  token: String | null,
  updateTagId: String | null,
  setShowUpdatePopup: React.Dispatch<React.SetStateAction<boolean>>,
  setUpdateTagId: React.Dispatch<React.SetStateAction<string | null>>,
  setUpdateTagName: React.Dispatch<React.SetStateAction<string>>,
  setRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  successfulSubmit: () => () => void,
  failedSubmit: () => () => void
) => {
  event.preventDefault();
  if (token && updateTagId) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const body = {
      ...Object.fromEntries(formData),
      tagName: formData.get('updatedTag')
    };
    const serverURL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(`${serverURL}/api/admin/tags/${updateTagId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      setShowUpdatePopup(false);
      setUpdateTagId(null);
      setUpdateTagName('');
      setRefetchTrigger(true);
      successfulSubmit();
    } else {
      console.error(response.statusText);
      failedSubmit();
    }
  }
};
