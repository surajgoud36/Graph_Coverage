import React from 'react';

function Section({ header, description, headerClass = '', descriptionClass = '' }) {
  return (
    <div className="card card-custom">
      <div className="card-body">
        <h5 className={`card-title ${headerClass}`}>{header}</h5>
        <p className={`card-text ${descriptionClass}`}>{description}</p>
      </div>
    </div>
  );
}

export default Section;