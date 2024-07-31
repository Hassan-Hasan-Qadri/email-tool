import React, { useState, useEffect } from 'react';
import { Navigation } from './navigation';

const TemplateList = () => {
    const [templates, setTemplates] = useState({});
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(() => {
        const storedTemplates = localStorage.getItem('emailTemplates');
        const selectedTemplate = localStorage.getItem('selectedTemplate');

        if (storedTemplates) {
            const parsedTemplates = JSON.parse(storedTemplates);
            setTemplates(parsedTemplates);
            setSelectedTemplate(selectedTemplate ? selectedTemplate : null);
        }
    }, []);

    const selectTemplate = (name) => {
        const tempValue = selectedTemplate === name ? null : name;
        setSelectedTemplate(tempValue);
        localStorage.setItem('selectedTemplate', tempValue);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.json')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const jsonData = JSON.parse(event.target.result);
                    setTemplates((prevTemplates) => {
                        const updatedTemplates = { ...jsonData };
                        localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
                        return updatedTemplates;
                    });
                } catch (error) {
                    alert('Invalid JSON file. Please upload a valid JSON.');
                }
            };
            reader.readAsText(file);
        } else {
            alert('Please upload a JSON file.');
        }
    };

    return (
        <div>
            <Navigation sno={3} />
            <div className="container">
                <div style={{ width: '133px', overflow: 'hidden' }}>
                    <input
                        type="file"
                        className='custom-file-input'
                        accept=".json"
                        onChange={handleFileUpload}
                    />
                </div>
                <h2 className="header">Saved Templates</h2>
                <ul className="list">
                    {Object.keys(templates).map((templateName) => (
                        <li
                            key={templateName}
                            className={selectedTemplate === templateName ? 'item selectedTemp' : 'item'}
                            onClick={() => selectTemplate(templateName)}
                        >
                            <strong>{templateName}</strong>
                            <div className="htmlContent" dangerouslySetInnerHTML={{ __html: templates[templateName] }}></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TemplateList;
