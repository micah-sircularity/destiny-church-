import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ContentCalendar = () => {
  const { posts, updatePost } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week');

  // Get the start of the current week
  const startOfCurrentWeek = startOfWeek(currentDate);
  
  // Create an array of days for the week view
  const weekDays = [...Array(7)].map((_, i) => {
    const day = addDays(startOfCurrentWeek, i);
    return {
      date: day,
      dateString: format(day, 'yyyy-MM-dd'),
      display: format(day, 'EEE d'),
      posts: posts.filter(post => {
        const postDate = new Date(post.scheduledDate);
        return isSameDay(postDate, day);
      })
    };
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;
    
    const post = posts.find(p => p.id === draggableId);
    const newDate = new Date(destination.droppableId);
    
    updatePost({
      ...post,
      scheduledDate: newDate.toISOString()
    });
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Calendar</h1>
        <div className="flex items-center space-x-4">
          <button 
            className={`px-3 py-1 rounded ${view === 'week' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button 
            className={`px-3 py-1 rounded ${view === 'month' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day) => (
            <div key={day.dateString} className="flex flex-col h-full">
              <div className="text-center py-2 bg-gray-100 rounded-t-lg font-medium">
                {day.display}
              </div>
              <Droppable droppableId={day.dateString}>
                {(provided) => (
                  <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1 bg-white p-2 rounded-b-lg min-h-[200px] border border-gray-200"
                  >
                    {day.posts.map((post, index) => (
                      <Draggable key={post.id} draggableId={post.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 mb-2 rounded-md shadow-sm cursor-move
                              ${post.platform === 'Facebook' ? 'bg-blue-50 border-l-4 border-blue-500' : ''}
                              ${post.platform === 'Instagram' ? 'bg-pink-50 border-l-4 border-pink-500' : ''}
                              ${post.platform === 'Twitter' ? 'bg-sky-50 border-l-4 border-sky-500' : ''}
                            `}
                          >
                            <h3 className="font-medium text-gray-800 mb-1">{post.title}</h3>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500">{post.platform}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium
                                ${post.status === 'scheduled' ? 'bg-green-100 text-green-800' : ''}
                                ${post.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
                              `}>
                                {post.status}
                              </span>
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
    </div>
  );
};

export default ContentCalendar;
