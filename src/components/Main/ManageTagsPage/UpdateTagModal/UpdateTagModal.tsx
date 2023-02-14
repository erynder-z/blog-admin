import React, { useContext } from 'react';
import { handleTagUpdateSubmit } from '../../../../helpers/HandleTagUpdateSubmit';
import { FaTimes } from 'react-icons/fa';
import './UpdateTagModal.css';
import AuthContext from '../../../../contexts/AuthContext';

interface Props {
  showUpdateModal: boolean;
  updateTagId: string | null;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateTagId: React.Dispatch<React.SetStateAction<string | null>>;
  setUpdateTagName: React.Dispatch<React.SetStateAction<string>>;
  setRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  successfulSubmit: () => () => void;
  failedSubmit: () => () => void;
  updateTagName: string;
}

export default function UpdateTagModal({
  showUpdateModal,
  updateTagId,
  setShowUpdateModal,
  setUpdateTagId,
  setUpdateTagName,
  setRefetchTrigger,
  successfulSubmit,
  failedSubmit,
  updateTagName
}: Props) {
  const { token } = useContext(AuthContext);
  return (
    <div className={`update_tag_modal-overlay${showUpdateModal ? ' fade-in' : ' fade-out'}`}>
      <div className="update_tag_modal-content">
        <button
          className="closeBtn"
          onClick={() => setShowUpdateModal(false)}
          aria-label="close modal">
          <FaTimes />
        </button>
        <form
          onSubmit={(event) => {
            handleTagUpdateSubmit(
              event,
              token,
              updateTagId,
              setShowUpdateModal,
              setUpdateTagId,
              setUpdateTagName,
              setRefetchTrigger,
              successfulSubmit,
              failedSubmit
            );
          }}>
          <input type="text" name="updatedTag" defaultValue={updateTagName} required autoFocus />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
