import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Carousel } from 'react-bootstrap';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file.');

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const res = await axios.post('https://ssp-gpvi.onrender.com/upload', formData);
      setMessage(res.data.message);
      await fetchUploadedFiles();
    } catch (err) {
      setMessage('Upload failed.');
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const res = await axios.get('https://ssp-gpvi.onrender.com/files');
      const filesWithBlobs = await Promise.all(
        res.data.map(async (file) => {
          const response = await axios.get(`https://ssp-gpvi.onrender.com/file/${file._id}`, {
            responseType: 'arraybuffer'
          });
          const blob = new Blob([response.data], { type: 'application/pdf' });
          return {
            ...file,
            blobUrl: URL.createObjectURL(blob)
          };
        })
      );
      setUploadedFiles(filesWithBlobs);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
    return () => {
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.blobUrl));
    };
  }, []);

  return (
    <div className="govt-portal">
      {/* Top Notification Bar */}
      <div className="top-notification-bar">
        <div className="container">
          <span className="notification-text">
            <span className="red-alert">!</span> Last date for submission: 31st December 2025
          </span>
          <a href="#skip" className="skip-link">Skip to main content</a>
        </div>
      </div>

      {/* National Identity Strip */}
      <div className="national-identity">
        <div className="container">
          <div className="national-symbols">
            <div className="emblem">
              <img src="nationalemblem.png" alt="National Emblem" />
            </div>
            <div className="title">
              <h1>भारत सरकार | Government of India</h1>
              <h2>Ministry of Health and Family Welfare</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <img src="arogya1 logo.png" alt="PM-JAY Logo" className="portal-logo" />
              <div className="portal-title">
                <h1>Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)</h1>
                <p>World's Largest Health Protection Scheme</p>
              </div>
            </div>
            <div className="header-links">
              <a href="#login" className="login-btn">Login</a>
              <div className="language-switcher">
                <select>
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="main-nav">
        <div className="container">
          <ul>
            <li><a href="/" className="active">Home</a></li>
            <li><a href="/about">About PM-JAY</a></li>
            <li><a href="/benefits">Benefits</a></li>
            <li><a href="/hospitals">Hospitals</a></li>
            <li><a href="/documents">Documents</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* New Carousel Section */}
      <div className="header-carousel">
  <Carousel>
    <Carousel.Item>
      <div className="carousel-slide">
        <img src="donate.jpg" alt="Banner 1" className="carousel-image" />
        <div className="overlay"></div>
        <div className="carousel-content">
          <h3>50 Crore Beneficiaries Covered</h3>
          <p>World's largest health protection scheme providing coverage up to ₹5 lakh per family per year</p>
          <a href="#learn-more" className="btn btn-primary">Learn More</a>
        </div>
      </div>
    </Carousel.Item>
    
    <Carousel.Item>
      <div className="carousel-slide">
        <img src="treat.jpg" alt="Banner 2" className="carousel-image" />
        <div className="overlay"></div>
        <div className="carousel-content">
          <h3>1600+ Medical Packages Covered</h3>
          <p>Including surgery, medical and day care treatments, diagnostics, and medicines</p>
          <a href="#packages" className="btn btn-primary">View Packages</a>
        </div>
      </div>
    </Carousel.Item>

    <Carousel.Item>
      <div className="carousel-slide">
        <img src="/hos.jpg" alt="Banner 3" className="carousel-image" />
        <div className="overlay"></div>
        <div className="carousel-content">
          <h3>Check Your Eligibility Now</h3>
          <p>See if you qualify for PM-JAY benefits using our online eligibility checker</p>
          <a href="#check-eligibility" className="btn btn-primary">Check Eligibility</a>
        </div>
      </div>
    </Carousel.Item>
  </Carousel>
</div>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="breadcrumbs">
            <a href="/">Home</a> &gt; <span>Document Upload</span>
          </div>

          <div className="content-wrapper">
            <div className="left-sidebar">
              <div className="quick-links">
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="#eligibility">Check Eligibility</a></li>
                  <li><a href="#hospitals">Find Hospitals</a></li>
                  <li><a href="#benefits">Scheme Benefits</a></li>
                  <li><a href="#faq">FAQs</a></li>
                  <li><a href="#grievance">Grievance Redressal</a></li>
                </ul>
              </div>
              <div className="important-notices">
                <h3>Important Notices</h3>
                <ul>
                  <li><a href="#notice1">Advisory on Fraudulent Calls</a></li>
                  <li><a href="#notice2">New Hospital Empanelment</a></li>
                  <li><a href="#notice3">PM-JAY App Download</a></li>
                </ul>
              </div>
            </div>

            <div className="main-section">
              <div className="page-title">
                <h1>Document Upload Portal</h1>
                <div className="title-border"></div>
              </div>

              <div className="upload-section govt-card">
                <h2><i className="fas fa-upload"></i> Upload Documents</h2>
                <form onSubmit={handleUpload}>
                  <div className="form-group">
                    <label>Select PDF Document:</label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <button className="browse-btn">Browse</button>
                    </div>
                    <div className="file-requirements">
                      <p>Max file size: 5MB | Allowed format: PDF only</p>
                    </div>
                  </div>
                  <button className="submit-btn" type="submit">
                    <i className="fas fa-cloud-upload-alt"></i> Upload Document
                  </button>
                </form>
                {message && <div className={`message-box ${message.includes('failed') ? 'error' : 'success'}`}>
                  {message}
                </div>}
              </div>

              <div className="documents-list govt-card">
                <h2><i className="fas fa-file-alt"></i> Uploaded Documents</h2>
                <div className="table-responsive">
                  <table className="govt-table">
                    <thead>
                      <tr>
                        <th>Document Name</th>
                        <th>Upload Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uploadedFiles.map((file, index) => (
                        <tr key={index}>
                          <td>{file.name}</td>
                          <td>{new Date(file.createdAt).toLocaleDateString()}</td>
                          <td>
                            <a
                              href={file.blobUrl}
                              download={file.name}
                              className="download-btn"
                            >
                              <i className="fas fa-download"></i> Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="govt-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-section">
              <h3>About PM-JAY</h3>
              <ul>
                <li><a href="#about">About Scheme</a></li>
                <li><a href="#benefits">Benefits</a></li>
                <li><a href="#eligibility">Eligibility</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#hospitals">Find Hospital</a></li>
                <li><a href="#grievance">Grievance</a></li>
                <li><a href="#faq">FAQs</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact Us</h3>
              <ul>
                <li>Toll-free: 14555 / 1800-111-565</li>
                <li>Email: support@pmjay.gov.in</li>
                <li>Address: Ministry of Health, Nirman Bhawan, New Delhi</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="copyright">
              © 2025 Ayushman Bharat PM-JAY. All Rights Reserved.
            </div>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a> | 
              <a href="#terms">Terms of Use</a> | 
              <a href="#sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;