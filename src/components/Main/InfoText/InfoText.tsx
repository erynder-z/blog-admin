import React from 'react';
import './InfoText.css';

interface Props {
  message: string | null;
}

export default function InfoText({ message }: Props) {
  return <h1 className="infoText">{message}</h1>;
}
