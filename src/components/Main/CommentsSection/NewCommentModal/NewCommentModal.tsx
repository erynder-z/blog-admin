import React, { useRef } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import './NewCommentModal.css';

interface Props {
  showModal: boolean;
  closeModal: () => void;
  setRefetchTrigger: (value: React.SetStateAction<boolean>) => void;
}

export default function NewCommentModal({ showModal, closeModal, setRefetchTrigger }: Props) {
  const params = useParams();
  const id: string | undefined = params.id;
  const usernameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const author = usernameRef.current?.value;
    const text = textRef.current?.value;

    if (!author || !text) {
      alert('Both the author and text fields are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/articles/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author, text })
      });
      const data = await response.json();
      setRefetchTrigger(true);
      usernameRef.current.value = '';
      textRef.current.value = '';
    } catch (error) {
      console.error(error);
    }

    closeModal();
  };

  return (
    <div className={`modal-overlay${showModal ? ' fade-in' : ' fade-out'}`}>
      <div className="modal-content">
        <h2>Add Comment</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input type="text" id="author" ref={usernameRef} required />
            <label htmlFor="author">Username</label>
          </div>
          <div className="input-container">
            <textarea id="text" ref={textRef} required />
            <label htmlFor="text">Comment</label>
          </div>
          <button type="submit">
            Submit <FaCheck />
          </button>
        </form>
        <button className="closeBtn" onClick={closeModal}>
          Close <FaTimes />
        </button>
      </div>
    </div>
  );
}
