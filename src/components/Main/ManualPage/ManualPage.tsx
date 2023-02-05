import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import './ManualPage.css';
import { FaPen, FaPenAlt, FaTrashAlt, FaRegCommentAlt, FaShapes, FaTimes } from 'react-icons/fa';
import { ViewType } from '../../../interfaces/customTypes';
import FilterContext from '../../../contexts/FilterContext';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function ManualPage({ setCurrentView }: Props) {
  const { setFilter } = useContext(FilterContext);
  useEffect(() => {
    setFilter(null);
    setCurrentView('Manual');
    localStorage.setItem('currentView', 'Manual');
  }, []);
  return (
    <div className="manual_page">
      <h1 className="manual_page-heading">How to use:</h1>
      <h2 className="manual_paragraph-heading">Creating a new article:</h2>
      <ol>
        <li>
          Click the "Add article <FaPen size="1rem" />" button.
        </li>
        <li>Select applicable tags from the provided list.</li>
        <li>Use the WYSIWYG editor to create the article.</li>
        <li>
          Format code blocks using the <strong>&#123; ; &#125;</strong> button.
        </li>
        <li>Add images by selecting them from your local machine. *</li>
        <li>Choose to publish or save as draft before submitting. **</li>
      </ol>
      <p>
        * Please note: By default, the server is configured to allow only for a small payload size
        for each request, so usually only a single image per post will work.
        <br />
        ** Before submitting, you can choose to publish the post immediately after submitting or to
        submit without publishing immediately.
        <br />
        Unpublished posts can be published at a later time.
      </p>
      <h2 className="manual_paragraph-heading">Editing an article:</h2>

      <ol>
        <li>
          Click the "Edit article <FaPenAlt size="1rem" />" button.
        </li>
        <li>Make changes to content, tags, and layout.</li>
        <li>Publish or unpublish the article.</li>
      </ol>

      <h2 className="manual_paragraph-heading">Deleting an article:</h2>

      <ol>
        <li>
          Click the "Delete article <FaTrashAlt size="1rem" />" button.
        </li>
        <li>Confirm deletion.</li>
      </ol>

      <h2 className="manual_paragraph-heading">Moderating article comments:</h2>
      <ol>
        <li>
          Click the "Add article <FaRegCommentAlt size="1rem" />" button to add comments.
        </li>
        <li>
          Click the "<FaTrashAlt size="1rem" />" icon next to a comment to delete it.
        </li>
      </ol>

      <h2 className="manual_paragraph-heading">Managing tags:</h2>
      <ol>
        <li>
          Click the "Manage tags <FaShapes size="1rem" />" button.
        </li>
        <li>
          Add new tags or delete existing ones by clicking the "<FaTimes size="1rem" />" button.
        </li>
      </ol>

      <h2 className="manual_paragraph-heading">Using the tags-filter:</h2>
      <ol>
        <li>
          On the "All", "Published articles" or "Unpublished articles" page, use the tag filter in
          the sidebar to display only articles containing a specific tag.
        </li>
        <li>Click on a tag to filter. Click on it again to remove the filter.</li>
      </ol>

      <h2 className="manual_paragraph-heading">Using the search:</h2>
      <ol>
        <li>
          On the "All", "Published articles" or "Unpublished articles" page, use the search box to
          search for articles containing the query.
        </li>
      </ol>

      <h2 className="manual_paragraph-heading">Changing the theme:</h2>
      <ol>
        <li>Click the "Theme" button to toggle between four different color themes.</li>
        <li>Your choice will be saved.</li>
      </ol>
    </div>
  );
}
