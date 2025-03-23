import React, { useState } from 'react';
import {
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';

const initialTasks = [
  {
    id: 1,
    title: 'Site Inspection – Sector 5',
    assignedTo: 'Rajesh Kumar',
    dueDate: '2025-03-28',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Material Order for Block A',
    assignedTo: 'Anita Verma',
    dueDate: '2025-03-25',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Finalize Contractor Agreement',
    assignedTo: 'Vikram Singh',
    dueDate: '2025-03-26',
    status: 'Completed',
  },
];

const TaskManagement = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    title: '',
    assignedTo: '',
    dueDate: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignedTo || !newTask.dueDate) return;

    const taskToAdd = {
      ...newTask,
      id: Date.now(),
    };
    setTasks([taskToAdd, ...tasks]);
    setNewTask({ title: '', assignedTo: '', dueDate: '', status: 'Pending' });
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardDocumentCheckIcon className="h-7 w-7 text-indigo-600" />
        <h2 className="text-2xl font-bold">Task & Project Management</h2>
      </div>

      {/* Task Form */}
      <form
        onSubmit={handleAddTask}
        className="bg-white dark:bg-gray-800 rounded p-4 shadow mb-6 space-y-4"
      >
        <h3 className="font-semibold text-lg">Assign New Task</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={newTask.assignedTo}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Task Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Assigned To</th>
              <th className="py-3 px-4 text-left">Due Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Update</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="border-t dark:border-gray-700">
                  <td className="py-3 px-4">{task.title}</td>
                  <td className="py-3 px-4">{task.assignedTo}</td>
                  <td className="py-3 px-4">{task.dueDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : task.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                      className="p-1 border rounded text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No tasks assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManagement;
