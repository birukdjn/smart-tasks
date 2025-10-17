import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Filter } from 'lucide-react';
import { TaskItem } from './TaskItem';

export const TasksList = ({ 
  tasks, 
  onDragEnd, 
  onToggle, 
  onDelete, 
  onEdit, 
  onPriorityChange,
  dragEnabled = true 
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {!dragEnabled && (
        <div className="px-6 py-3 bg-yellow-50 border-b border-yellow-200">
          <p className="text-sm text-yellow-700 flex items-center gap-2">
            <Filter size={16} />
            Drag and drop is enabled only when viewing the full unfiltered list. Clear search and filters to reorder tasks.
          </p>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef} 
              className="min-h-[200px] p-6"
            >
              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">No tasks found</div>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your filters or add a new task to get started!
                  </p>
                </div>
              ) : (
                tasks.map((task, index) => (
                  <Draggable 
                    key={task.id} 
                    draggableId={task.id} 
                    index={index}
                    isDragDisabled={!dragEnabled}
                  >
                    {(draggableProvided) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        className="mb-3 last:mb-0"
                      >
                        <TaskItem
                          task={task}
                          onToggle={onToggle}
                          onDelete={onDelete}
                          onEdit={onEdit}
                          onPriorityChange={onPriorityChange}
                          dragHandleProps={draggableProvided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};