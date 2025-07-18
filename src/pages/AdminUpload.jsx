import React, { useState, useRef } from "react";
import "../styles/AdminUpload.css";

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
  "video/mp4",
];

const AdminUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef();

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `File type not allowed: ${file.type}`;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `File size exceeds ${MAX_FILE_SIZE_MB}MB limit`;
    }
    return null;
  };

  const handleFiles = (selectedFiles) => {
    setErrorMsg("");
    const validFiles = [];
    for (let file of selectedFiles) {
      const error = validateFile(file);
      if (error) {
        setErrorMsg(error);
        return;
      }
      validFiles.push({
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
        id: Date.now() + Math.random(),
      });
    }
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleFileInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const startUpload = () => {
    if (files.length === 0) {
      setErrorMsg("Please select files to upload.");
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setFiles([]);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="page admin-upload-page">
      <h2>Upload Study Materials</h2>

      <div
        className={`upload-dropzone ${uploading ? "disabled" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        tabIndex={0}
        aria-label="File upload dropzone"
      >
        <p>Drag & drop files here, or</p>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
        >
          Select Files
        </button>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: "none" }}
          disabled={uploading}
          aria-hidden="true"
        />
      </div>

      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      {files.length > 0 && (
        <div className="files-list">
          {files.map(({ id, file, preview }) => (
            <div key={id} className="file-item">
              {preview ? (
                <img src={preview} alt={file.name} className="file-preview" />
              ) : (
                <div className="file-icon">{file.type.split("/")[1].toUpperCase()}</div>
              )}
              <div className="file-info">
                <p className="file-name">{file.name}</p>
                <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              {!uploading && (
                <button
                  className="remove-btn"
                  onClick={() => removeFile(id)}
                  aria-label={`Remove file ${file.name}`}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className="upload-progress">
          <div
            className="progress-bar"
            style={{ width: `${uploadProgress}%` }}
            aria-valuenow={uploadProgress}
            aria-valuemin="0"
            aria-valuemax="100"
            role="progressbar"
          />
          <p>{uploadProgress}% uploaded</p>
        </div>
      )}

      <button
        className="upload-btn"
        onClick={startUpload}
        disabled={uploading || files.length === 0}
        aria-disabled={uploading || files.length === 0}
      >
        {uploading ? "Uploading..." : "Start Upload"}
      </button>
    </div>
  );
};

export default AdminUpload;