import React, { useEffect, useState } from 'react';


const ViewTemplate = ({closeModal, template, recipentData}) => {
    const [templateHTML, setTemplateHTML] = useState('');

    const fetchPatterns = (text) => {
        const regex = /\{\{(.*?)\}\}/g;
        const matches = [...text.matchAll(regex)];
        return matches.map(match => match[1]);
    }

    useEffect(() => {
        let exampleText = template;
        let patterns = fetchPatterns(exampleText);
        patterns.forEach(patter_key => {
            exampleText = exampleText.replace('{{'+patter_key+'}}', recipentData[patter_key] || '{{'+patter_key+'}}')
        });
        setTemplateHTML(exampleText);
    }, []);
   

  return (
    <div>
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>Template Details</h2>
                <div className="htmlContent" dangerouslySetInnerHTML={{ __html: templateHTML }}></div>
            </div>
        </div>
    </div>
  );
};

export default ViewTemplate;
