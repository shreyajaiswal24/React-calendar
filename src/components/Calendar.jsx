import { useState, useRef } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Event 1",
      start: "2025-02-02 00:00",
      end: "2025-02-04 21:15",
      resource: "Resource A",
      color: "#ffcdd2",
    },
    {
      id: "2",
      title: "Event 2",
      start: "2025-02-10 09:00",
      end: "2025-02-13 15:00",
      resource: "Resource C",
      color: "#bbdefb",
    },
    {
      id: "3",
      title: "Event 3",
      start: "2025-02-13 00:00",
      end: "2025-02-13 12:00",
      resource: "Resource D",
      color: "#f8bbd0",
    },
    {
      id: "4",
      title: "Event 4",
      start: "2025-02-15 07:00",
      end: "2025-02-15 12:00",
      resource: "Resource E",
      color: "#c8e6c9",
    },
    {
      id: "5",
      title: "Event 5",
      start: "2025-02-03 00:00",
      end: "2025-02-03 23:45",
      resource: "Resource F",
      color: "#fff9c4",
    },
    {
      id: "6",
      title: "Event 6",
      start: "2025-02-10 08:00",
      end: "2025-02-10 20:00",
      resource: "Resource G",
      color: "#b2ebf2",
    }
  ]);
  
  const [resources] = useState([
    "Resource A",
    "Resource B",
    "Resource C",
    "Resource D",
    "Resource E",
    "Resource F",
    "Resource G",
    "Resource H",
  ]);
  
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const [draggingEvent, setDraggingEvent] = useState(null);
  const [resizing, setResizing] = useState(null);
  const dragStartPos = useRef(null);
  const initialEventData = useRef(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const getMiniCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startDay = firstDay.getDay();
    
    for (let i = 0; i < startDay; i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift(prevDate);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const deleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const onDragStart = (e, eventId) => {
    setDraggingEvent(eventId);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    e.target.style.opacity = "0.5";
    initialEventData.current = events.find(evt => evt.id === eventId);
  };

  const onDragEnd = (e) => {
    if (e.target) e.target.style.opacity = "1";
    setDraggingEvent(null);
    initialEventData.current = null;
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, date, resource) => {
    e.preventDefault();
    if (!draggingEvent) return;

    const eventToUpdate = events.find(evt => evt.id === draggingEvent);
    if (!eventToUpdate) return;

    const startDate = new Date(date);
    const duration = new Date(eventToUpdate.end) - new Date(eventToUpdate.start);
    const endDate = new Date(startDate.getTime() + duration);

    setEvents(events.map(evt => {
      if (evt.id === draggingEvent) {
        return {
          ...evt,
          start: startDate.toISOString().slice(0, 16),
          end: endDate.toISOString().slice(0, 16),
          resource
        };
      }
      return evt;
    }));
  };

  const onResizeStart = (e, eventId, edge) => {
    e.stopPropagation();
    setResizing({ eventId, edge });
    const event = events.find(evt => evt.id === eventId);
    initialEventData.current = {
      start: new Date(event.start),
      end: new Date(event.end)
    };
    document.addEventListener('mousemove', onResizeMove);
    document.addEventListener('mouseup', onResizeEnd);
  };

  const onResizeMove = (e) => {
    if (!resizing || !initialEventData.current) return;

    const event = events.find(evt => evt.id === resizing.eventId);
    if (!event) return;

    const deltaX = e.clientX - dragStartPos.current.x;
    const daysChange = Math.round(deltaX / 100);
    
    setEvents(events.map(evt => {
      if (evt.id === resizing.eventId) {
        const newDates = { ...evt };
        if (resizing.edge === 'start') {
          const newStart = new Date(initialEventData.current.start);
          newStart.setDate(newStart.getDate() + daysChange);
          newDates.start = newStart.toISOString().slice(0, 16);
        } else {
          const newEnd = new Date(initialEventData.current.end);
          newEnd.setDate(newEnd.getDate() + daysChange);
          newDates.end = newEnd.toISOString().slice(0, 16);
        }
        return newDates;
      }
      return evt;
    }));
  };

  const onResizeEnd = () => {
    setResizing(null);
    initialEventData.current = null;
    document.removeEventListener('mousemove', onResizeMove);
    document.removeEventListener('mouseup', onResizeEnd);
  };

  const isCurrentDate = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formatEventDuration = (start, end) => {
    return `${new Date(start).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })} - ${new Date(end).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })}`;
  };

  const getEventStyle = (event) => ({
    backgroundColor: event.color,
    opacity: 0.9,
    position: 'relative',
    width: '100%'
  });

  const MiniCalendar = () => {
    const days = getMiniCalendarDays();
    const today = new Date();

    return (
      <div className="absolute top-16 left-4 bg-white shadow-lg rounded-lg p-4 z-50 w-64">
        <div className="flex items-center justify-between mb-4">
          <span className="text-blue-500 font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="text-gray-600 hover:text-blue-500"
            >
              ‹
            </button>
            <button
              onClick={nextMonth}
              className="text-gray-600 hover:text-blue-500"
            >
              ›
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div key={day} className="text-center text-gray-500 text-sm">
              {day}
            </div>
          ))}
          {days.map((date, index) => (
            <div
              key={index}
              className={`text-center p-1 text-sm ${
                date.getMonth() !== currentDate.getMonth()
                  ? "text-gray-300"
                  : isCurrentDate(date)
                  ? "bg-blue-500 text-white rounded-full"
                  : "text-gray-700"
              }`}
            >
              {date.getDate()}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 relative">
        <h2 
          className="text-2xl text-blue-500 font-normal cursor-pointer"
          onClick={() => setShowMiniCalendar(!showMiniCalendar)}
        >
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-1 text-blue-500 hover:bg-blue-50 rounded"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded"
          >
            ›
          </button>
        </div>
        {showMiniCalendar && <MiniCalendar />}
      </div>

      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-40 p-2 border border-gray-200 bg-gray-50"></th>
              {getDaysInMonth(currentDate).map((date) => (
                <th
                  key={date.getTime()}
                  className="min-w-[100px] p-2 border border-gray-200 text-center"
                >
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm">
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                    <span
                      className={`text-lg ${
                        isCurrentDate(date)
                          ? "w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto"
                          : ""
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource}>
                <td className="p-2 border border-gray-200 bg-gray-50 font-medium">
                  {resource}
                </td>
                {getDaysInMonth(currentDate).map((date) => (
                  <td
                    key={`${resource}-${date}`}
                    className="border border-gray-200 p-1 h-20 relative"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, date, resource)}
                  >
                    {events
                      .filter(
                        (event) =>
                          event.resource === resource &&
                          new Date(event.start).toDateString() ===
                            date.toDateString()
                      )
                      .map((event) => (
                        <div
                          key={event.id}
                          className="p-1 mb-1 rounded text-sm cursor-move relative group"
                          style={getEventStyle(event)}
                          draggable
                          onDragStart={(e) => onDragStart(e, event.id)}
                          onDragEnd={onDragEnd}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{event.title}</span>
                            <button
                              className="opacity-0 group-hover:opacity-100 text-gray-600"
                              onClick={() => deleteEvent(event.id)}
                            >
                              ×
                            </button>
                          </div>
                          <span className="text-xs block opacity-75">
                            {formatEventDuration(event.start, event.end)}
                          </span>
                          <div
                            className="absolute left-0 top-0 w-2 h-full cursor-w-resize opacity-0 group-hover:opacity-100"
                            onMouseDown={(e) => onResizeStart(e, event.id, 'start')}
                          />
                          <div
                            className="absolute right-0 top-0 w-2 h-full cursor-e-resize opacity-0 group-hover:opacity-100"
                            onMouseDown={(e) => onResizeStart(e, event.id, 'end')}
                          />
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;