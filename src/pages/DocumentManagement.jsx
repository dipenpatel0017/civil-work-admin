import React, { useState } from 'react';
import { DocumentArrowUpIcon } from '@heroicons/react/24/solid';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Simulated user role (Admin or Viewer)
  const userRole = 'Admin'; // For secure access control

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const newDoc = {
      name: selectedFile.name,
      uploadedAt: new Date().toLocaleString(),
      size: (selectedFile.size / 1024).toFixed(2) + ' KB',
    };

    setDocuments([...documents, newDoc]);
    setSelectedFile(null);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <DocumentArrowUpIcon className="h-7 w-7 text-blue-600" />
        <h2 className="text-2xl font-bold">Document Management</h2>
      </div>

      {userRole === 'Admin' && (
        <form
          onSubmit={handleUpload}
          className="flex flex-col md:flex-row items-center gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow"
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="p-2 border rounded w-full md:w-auto"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
          >
            Upload
          </button>
        </form>
      )}

      {uploadSuccess && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-400">
          ✅ Document uploaded successfully!
        </div>
      )}

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase">
              <th className="py-3 px-4 text-left">Document Name</th>
              <th className="py-3 px-4 text-left">Size</th>
              <th className="py-3 px-4 text-left">Uploaded At</th>
              {userRole === 'Admin' && (
                <th className="py-3 px-4 text-left">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <tr key={index} className="border-t dark:border-gray-700">
                  <td className="py-3 px-4">{doc.name}</td>
                  <td className="py-3 px-4">{doc.size}</td>
                  <td className="py-3 px-4">{doc.uploadedAt}</td>
                  {userRole === 'Admin' && (
                    <td className="py-3 px-4 text-red-600 font-semibold cursor-pointer hover:underline">
                      Delete
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={userRole === 'Admin' ? 4 : 3}
                  className="text-center py-4 text-gray-500"
                >
                  No documents uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentManagement;
