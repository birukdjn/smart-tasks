// src/components/FileAttachments.jsx
import { useState } from 'react';
import { Paperclip, Download, Trash2, File, Image, FileText } from 'lucide-react';

const FileAttachments = ({ taskId }) => {
  const [attachments, setAttachments] = useState([
    {
      id: 1,
      taskId: '1',
      name: 'design-mockup.png',
      type: 'image',
      size: '2.4 MB',
      uploadedBy: 'Sarah Chen',
      uploadDate: new Date('2024-12-19T09:30:00'),
      url: '#'
    },
    {
      id: 2,
      taskId: '1',
      name: 'requirements.pdf',
      type: 'pdf',
      size: '1.2 MB',
      uploadedBy: 'Mike Johnson',
      uploadDate: new Date('2024-12-19T10:15:00'),
      url: '#'
    },
    {
      id: 3,
      taskId: '1',
      name: 'research-data.xlsx',
      type: 'document',
      size: '3.1 MB',
      uploadedBy: 'Emily Davis',
      uploadDate: new Date('2024-12-19T14:45:00'),
      url: '#'
    }
  ]);

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5 text-blue-600" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload files to a server
    files.forEach(file => {
      const newAttachment = {
        id: Date.now(),
        taskId,
        name: file.name,
        type: file.type.split('/')[0],
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedBy: 'You',
        uploadDate: new Date(),
        url: URL.createObjectURL(file)
      };
      setAttachments(prev => [...prev, newAttachment]);
    });
  };

  const handleDeleteAttachment = (id) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Attachments</h3>
        <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
          <Paperclip className="mr-2 h-4 w-4" />
          Add Files
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Attachments List */}
      <div className="space-y-3">
        {attachments.map((attachment) => (
          <div key={attachment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                {getFileIcon(attachment.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {attachment.name}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-500">{attachment.size}</span>
                  <span className="text-xs text-gray-500">
                    Uploaded by {attachment.uploadedBy}
                  </span>
                  <span className="text-xs text-gray-500">
                    {attachment.uploadDate.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={attachment.url}
                download={attachment.name}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Download className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleDeleteAttachment(attachment.id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {attachments.length === 0 && (
          <div className="text-center py-8">
            <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No attachments</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by uploading some files.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileAttachments;