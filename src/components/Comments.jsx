// src/components/Comments.jsx
import { useState } from 'react';
import { useCollaboration } from '../contexts/CollaborationContext';
import { Send, User, MoreVertical } from 'lucide-react';

const Comments = ({ taskId }) => {
  const [newComment, setNewComment] = useState('');
  const { addComment } = useCollaboration();

  // Mock comments data
  const [comments, setComments] = useState([
    {
      id: 1,
      taskId: '1',
      user: 'Sarah Chen',
      avatar: 'SC',
      content: 'This design looks great! Have we considered the mobile responsive version?',
      timestamp: new Date('2024-12-19T10:30:00'),
      replies: [
        {
          id: 2,
          user: 'Mike Johnson',
          avatar: 'MJ',
          content: 'Yes, mobile designs are ready. Will share them tomorrow.',
          timestamp: new Date('2024-12-19T11:15:00')
        }
      ]
    },
    {
      id: 3,
      taskId: '1',
      user: 'Emily Davis',
      avatar: 'ED',
      content: 'The color scheme needs adjustment for better accessibility.',
      timestamp: new Date('2024-12-19T14:20:00'),
      replies: []
    }
  ]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      taskId,
      user: 'You',
      avatar: 'ME',
      content: newComment,
      timestamp: new Date(),
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    addComment(comment);
    setNewComment('');
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-6">
      {/* Comment Input */}
      <form onSubmit={handleAddComment} className="flex space-x-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">ME</span>
          </div>
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="mr-2 h-4 w-4" />
              Comment
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">{comment.avatar}</span>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{comment.user}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {formatTime(comment.timestamp)}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-8 mt-3 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-green-600">{reply.avatar}</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-white rounded-lg p-3 border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{reply.user}</span>
                          <span className="text-xs text-gray-500">
                            {formatTime(reply.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;