import React, { useState } from 'react';
import { FiEdit2, FiX } from 'react-icons/fi';

export default function OtherQuestions() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only .jpg, .pdf, .png, .jpeg files are allowed');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    console.log('Selected file:', selectedFile);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg shadow-lg border border-gray-300 p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Other Questions
            </h2>
            <p className="text-gray-800 text-base md:text-lg">
              Fill in all required fields to create a request
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-400 rounded-lg outline-none"
                    required
                  />
                  <FiEdit2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-400 rounded-lg outline-none"
                    required
                  />
                  <FiEdit2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5" />
                </div>
              </div>
            </div>
                   <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    name="TransactionID"
                    value={formData.fullName}
                    onChange={handleInputChange}
                     placeholder="( Optional )"
                    className="w-60 px-4 py-3 border border-gray-400 rounded-lg outline-none"
                    required
                  />
                 
                </div>
              </div>
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-400 rounded-lg outline-none"
                placeholder="Please describe your concern in detail..."
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                />
                <div className="inline-flex items-center px-2 py-1 border-2 border-gray-600 text-black rounded-lg cursor-pointer transition hover:bg-gray-50">
                  <span className="font-medium">Choose File</span>
                  <span className="ml-2">→</span>
                </div>
              </label>
              
              {selectedFile && (
                <div className="mt-2 flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
                  <p className="text-sm text-gray-700">
                    Selected: {selectedFile.name}
                  </p>
                  <button
                    type="button"
                    onClick={handleFileRemove}
                    className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    title="Remove file"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">
                  Allowed file types are: .jpg, .pdf, .png, .jpeg
                </p>
                <p className="text-sm text-gray-500">
                  Allowed size: 2MB
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full md:w-auto px-20 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}