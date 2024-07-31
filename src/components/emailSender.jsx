import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'; // Importing XLSX to parse Excel files
import Papa from 'papaparse'; // Importing PapaParse to parse CSV files
import { Navigation } from './navigation';
import ViewTemplate from './viewTemplateModal';
import ErrorModal from './error_modal';

const EmailSender = () => {
  const [recipientData, setRecipientData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedRecipientData, setSelectedRecipient] = useState(null);
  const [isSendEmailModalOpen, setSendEmailModalOpen] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      if (file.name.endsWith('.csv')) {
        // Parse CSV using PapaParse
        Papa.parse(result, {
          header: true,
          complete: (parsed) => {
            setRecipientData(parsed.data); // Store parsed data in state
          },
        });
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        // Parse Excel using XLSX
        const workbook = XLSX.read(result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        // Assuming first row is headers, adjust if needed
        const headers = data[0];
        const parsedData = data.slice(1).map((row) =>
          headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
          }, {})
        );
        localStorage.setItem('recipientData',JSON.stringify(parsedData));
        setRecipientData(parsedData); // Store parsed data in state
      } else {
        alert('Unsupported file type. Please upload CSV or Excel files.');
      }
    };
    reader.readAsBinaryString(file);
  };

  const sendEmails = () => {
    setSendEmailModalOpen(!isSendEmailModalOpen);
    // Here you can implement the logic to send emails using recipientData
    console.log('Sending emails...', recipientData);
    // Example: fetch or use a service to send emails
    // Replace this with your actual implementation
  };

  const handleViewTemplate = (recipient) => {
    console.log(recipient);
    setSelectedRecipient(recipient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSendEmailModalOpen(false);
    setIsModalOpen(false);
    setSelectedRecipient(null);
  };

  useEffect(() => {
    const storedTemplates = localStorage.getItem('emailTemplates');
    const selectedTemplate = localStorage.getItem('selectedTemplate');
    const emailRecipientData = localStorage.getItem('recipientData');

    if (storedTemplates && selectedTemplate) {
        let tempaltes = JSON.parse(storedTemplates);
        console.log(tempaltes,selectedTemplate);
        if(selectedTemplate){
          setSelectedTemplate(tempaltes[selectedTemplate])
        }
        console.log(emailRecipientData);
        if(emailRecipientData){
          setRecipientData(JSON.parse(emailRecipientData)); // Store parsed data in state
        }
    }
}, []);

  return (
    <div>
      <Navigation sno={2}/>
      <div className="email-sender-container">
        <h2>Upload Excel or CSV File</h2>
        <div className='emial-file-action-btn'>
          <div style={{width:'133px', overflow: 'hidden'}}>
            <input type="file" className='custom-file-input' accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
          </div>
          <button className="send-emails-btn" onClick={sendEmails} disabled={recipientData.length === 0}>
            Send Emails
          </button>
        </div>
        <hr />
        <h3>Recipient Data:</h3>
        <ul>
          {recipientData.map((recipient, index) => (
            <li key={index} className='recipient-list-item'>
              <div>Email: {recipient.email}, Subject: {recipient.subject}</div>
              <button className='view-btn' onClick={() => handleViewTemplate(recipient)}>
                View Template
              </button>
            </li>
          ))}
        </ul>
      </div>
      {(isModalOpen && selectedRecipientData && selectedTemplate) ? (
       <ViewTemplate 
          closeModal={closeModal}
          template={selectedTemplate}
          recipentData={selectedRecipientData}
       />
      ):(
        isModalOpen && (<ErrorModal
          closeModal={closeModal}
          message={'Plaease select the template form list tab'}
        />)
      )
    }
    {
      isSendEmailModalOpen && (<ErrorModal
        closeModal={closeModal}
        message={'This feature is to be implemented'}
      />)
    }
    </div>
  );
};

export default EmailSender;
