import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import './ArticleFetchingAnimation.css';

export default function ArticleFetchingAnimation() {
  return (
    <div className="fetching">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="Loading data"
        wrapperStyle={{}}
        wrapperClass="loading-spinner"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
}
