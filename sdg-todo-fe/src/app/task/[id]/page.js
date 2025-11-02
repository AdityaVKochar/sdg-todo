'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function TaskDetail() {
  const router = useRouter();
  const params = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    dueAt: '',
  });

  useEffect(() => {
    if (params.id) {
      fetchTask();
    }
  }, [params.id]);

  const fetchTask = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setTask(data);
        setFormData({
          title: data.title,
          content: data.content,
          dueAt: data.dueAt.split('T')[0],
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching task:', error);
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTask(updatedTask);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this task?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${params.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          router.push('/');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Task not found</p>
          <Link href="/" className="text-gray-900 hover:underline">
            ← Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-block text-gray-900 hover:underline mb-8">
          ← Back
        </Link>

        <div className="border border-gray-200 p-8">
          {!isEditing ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-light text-gray-900 mb-2">
                  {task.title}
                </h1>
                <div className="text-xs text-gray-500 mb-6">
                  {formatDate(task.createdAt)} · Due {formatDate(task.dueAt)}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {task.content}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="border border-gray-900 hover:bg-gray-900 hover:text-white px-4 py-2 text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="border border-gray-300 hover:border-gray-900 px-4 py-2 text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-light mb-6">Edit Task</h2>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="date"
                    name="dueAt"
                    value={formData.dueAt}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-sm transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        title: task.title,
                        content: task.content,
                        dueAt: task.dueAt.split('T')[0],
                      });
                    }}
                    className="border border-gray-300 hover:border-gray-900 px-4 py-2 text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
