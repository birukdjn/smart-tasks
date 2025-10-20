// src/components/TaskBoard.jsx
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreVertical, Clock, Flag, User } from 'lucide-react';

const TaskBoard = ({ tasks = [], onTaskClick }) => {
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'To Do',
      tasks: tasks.filter(task => task.status === 'todo')
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      tasks: tasks.filter(task => task.status === 'inProgress')
    },
    review: {
      id: 'review',
      title: 'Review',
      tasks: tasks.filter(task => task.status === 'review')
    },
    done: {
      id: 'done',
      title: 'Done',
      tasks: tasks.filter(task => task.status === 'done')
    }
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceTasks = [...sourceColumn.tasks];
      const destTasks = [...destColumn.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      
      // Update task status when moving between columns
      const updatedTask = {
        ...removed,
        status: destination.droppableId
      };
      
      destTasks.splice(destination.index, 0, updatedTask);
      
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedTasks = [...column.tasks];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);
      
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedTasks
        }
      });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIconColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const handleTaskClick = (task, e) => {
    // Prevent click when dragging or when clicking on the more options button
    if (e.target.closest('button') || e.target.closest('[data-rbd-drag-handle]')) {
      return;
    }
    onTaskClick?.(task);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.values(columns).map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
              <span>{column.title}</span>
              <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                {column.tasks.length}
              </span>
            </h3>
            
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] space-y-3 ${
                    snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''
                  }`}
                >
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer ${
                            snapshot.isDragging ? 'shadow-lg rotate-2' : ''
                          }`}
                          onClick={(e) => handleTaskClick(task, e)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering task click
                                // Handle more options here
                              }}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                            {task.description}
                          </p>

                          {/* Tags Section */}
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {task.tags.slice(0, 2).map((tag, tagIndex) => (
                                <span 
                                  key={tagIndex} 
                                  className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {task.tags.length > 2 && (
                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                  +{task.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-3">
                              <div className={`flex items-center px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                                <Flag className={`h-3 w-3 mr-1 ${getPriorityIconColor(task.priority)}`} />
                                <span className="capitalize text-xs font-medium">{task.priority}</span>
                              </div>
                              
                              <div className="flex items-center text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-3 w-3 text-blue-600" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;