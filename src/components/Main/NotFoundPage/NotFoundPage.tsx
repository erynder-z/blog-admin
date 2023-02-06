import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { ViewType } from '../../../interfaces/customTypes';
import BackButton from '../BackButton/BackButton';
import './NotFoundPage.css';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function NotFoundPage({ setCurrentView }: Props) {
  useEffect(() => {
    setCurrentView('Other');
    localStorage.setItem('currentView', 'Other');
  }, []);
  return (
    <div className="not_found" aria-live="assertive">
      <h1>The 404 Error Page: Understanding and Creating a Great User Experience</h1>
      <p>
        When browsing the web, we've all come across the infamous 404 error page. It's that dreaded
        moment when you click on a link and instead of finding the content you were looking for,
        you're met with a page that says "404 Error" or "Page Not Found." While it may seem like a
        small detail, a well-designed 404 error page can make a big impact on the user experience.
      </p>
      <p>
        So, what exactly is a 404 error page? Simply put, it's a web page that is displayed when a
        user tries to access a page that doesn't exist on a website. This can happen for a variety
        of reasons, such as typos in the URL, broken links, or content that has been removed or
        moved.
      </p>
      <p>
        A 404 error page is not only an opportunity to inform the user that the content they were
        looking for cannot be found, but it can also be used to guide them back to the rest of the
        website. This is why a well-designed 404 error page is crucial for a positive user
        experience.
      </p>
      <h2>404</h2>
      <BackButton />
    </div>
  );
}
