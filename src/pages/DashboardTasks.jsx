import { useState, useEffect, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskItem from "../../components/TaskItem";

export default function DashboardTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("General");
  const [tagsInput, setTagsInput] = useState("");
  const [priority, setPriority] = useState("Low");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!("Notification" in window)) return;
    Notification.requestPermission();
    const today = new Date().toISOString().split("T")[0];
    const dueToday = tasks.filter((task) => task.dueDate === today && !task.completed);
    if (dueToday.length > 0 && Notification.permission === "granted") {
      new Notification("📅 You have tasks due today!", {
        body: dueToday.map((t) => `• ${t.title}`).join("\n"),
      });
    }
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const tagsArray = tagsInput.split(",").map(t => t.trim()).filter(Boolean);

    const newItem = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      category,
      tags: tagsArray,
      dueDate,
      priority,
    };

    setTasks(prev => [newItem, ...prev]);
    setNewTask("");
    setCategory("General");
    setTagsInput("");
    setDueDate("");
    setPriority("Low");
  };

  const handleToggle = (id) =>
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const handleDelete = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const handleEdit = (id, newTitle) =>
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, title: newTitle } : t)));

  const handlePriorityChange = (id, newPriority) =>
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, priority: newPriority } : t)));

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        if (filter === "completed") return t.completed;
        if (filter === "incomplete") return !t.completed;
        return true;
      })
      .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
      .filter((t) => (categoryFilter === "All" ? true : t.category === categoryFilter));
  }, [tasks, filter, search, categoryFilter]);

  const dragEnabled = filter === "all" && !search.trim() && categoryFilter === "All";

  const handleDragEnd = (result) => {
    if (!result.destination || !dragEnabled) return;

    const updated = Array.from(tasks);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setTasks(updated);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-600 mb-4">Tasks</h1>

      <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row mb-4 gap-2 flex-wrap">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 border border-gray-300 rounded-xl p-2"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded-xl">
          <option>General</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
        </select>

        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="Tags (comma separated)"
          className="border p-2 rounded-xl"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded-xl"
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 rounded-xl">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl">Add</button>
      </form>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="flex-1 border p-2 rounded-xl"
        />

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border p-2 rounded-xl">
          <option value="All">All Categories</option>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>

        <div className="flex gap-2">
          <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-xl ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>All</button>
          <button onClick={() => setFilter("completed")} className={`px-3 py-1 rounded-xl ${filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Completed</button>
          <button onClick={() => setFilter("incomplete")} className={`px-3 py-1 rounded-xl ${filter === "incomplete" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Incomplete</button>
        </div>
      </div>

      {!dragEnabled && (
        <p className="text-sm text-gray-500 mb-2">
          Drag and drop is enabled only when viewing the full unfiltered list. Clear search and filters to reorder.
        </p>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-2">
              {filteredTasks.length === 0 ? (
                <p className="text-gray-500">No tasks found.</p>
              ) : (
                (dragEnabled ? tasks : filteredTasks).map((task, index) => {
                  const listItem = dragEnabled ? task : task;

                  if (!dragEnabled) {
                    return (
                      <div key={listItem.id}>
                        <TaskItem
                          task={listItem}
                          onToggle={handleToggle}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                          onPriorityChange={handlePriorityChange}
                        />
                      </div>
                    );
                  }

                  return (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(draggableProvided) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                        >
                          <TaskItem
                            task={task}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            onPriorityChange={handlePriorityChange}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {tasks.length > 0 && (
        <button onClick={() => setTasks([])} className="mt-2 text-sm text-red-600 underline">Clear all tasks</button>
      )}
    </div>
  );
}
