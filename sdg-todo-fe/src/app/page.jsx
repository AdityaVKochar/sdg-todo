"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "../components/TaskList";
import Popup from "../components/Popup";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    dueAt: "",
  });

  const handleSubmit = () => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData } : task
        )
      );
      setEditingTask(null);
    } else {
      const newTask = {
        id: uuidv4(),
        title: formData.title,
        content: formData.content,
        dueAt: formData.dueAt,
        createdAt: new Date().toISOString(),
      };
      setTasks([newTask, ...tasks]);
    }
    setFormData({ title: "", content: "", dueAt: "" });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      content: task.content,
      dueAt: task.dueAt,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setFormData({ title: "", content: "", dueAt: "" });
  };

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl text-black">Tasks</h1>
          <button
            onClick={() => setShowModal(true)}
            className="border border-black hover:bg-black hover:text-white text-black px-4 py-2"
          >
            New Task
          </button>
        </div>

        <TaskList
          tasks={tasks}
          formatDate={formatDate}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        <Popup
          isOpen={showModal}
          isEditing={editingTask !== null}
          formData={formData}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
