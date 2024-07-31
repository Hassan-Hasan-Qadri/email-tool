import React, { useEffect, useRef } from 'react';
import EmailEditor from 'react-email-editor';
import { Navigation } from './navigation';

const MyEmailEditor = () => {
    const emailEditorRef = useRef(null);

    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { html } = data;
            const templateName = prompt('Enter template name:');
            if (templateName) {
                saveTemplateToJson(templateName, html);
            }
        });
    };

    const saveTemplateToJson = (templateName, html) => {
        // Load existing templates or create an empty object
        let templates = {};
        const existingTemplates = localStorage.getItem('emailTemplates');
        if (existingTemplates) {
            templates = JSON.parse(existingTemplates);
        }

        // Add new template to the object
        templates[templateName] = html;
        const jsonString = JSON.stringify(templates, null, 2);
        // Save updated templates back to localStorage
        localStorage.setItem('emailTemplates', jsonString);
        // Create a Blob object from the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a link element to trigger the download
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = 'templates.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    };


  return (
    <div>
        <Navigation sno={1}/>
        <div className='hide-box-container'>
                <div id='hide-box' style={{ height: '50px', background: '#f9f9f9' }}></div>
            </div>
      <div style={{'text-align': 'end'}}>
        <button className='export-btn' onClick={exportHtml}>Export HTML</button>
      </div>
      <EmailEditor ref={emailEditorRef} style={{ height: '597px' }}/>
    </div>
  );
};

export default MyEmailEditor;