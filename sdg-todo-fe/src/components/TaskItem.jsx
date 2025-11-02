export default function TaskItem({ task, formatDate, onEdit, onDelete }) {
  return (
    <div className="border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg text-black mb-1">{task.title}</h3>
          <p className="text-black text-sm">{task.content}</p>
        </div>
        <span className="text-xs text-black ml-4">
          {formatDate(task.dueAt)}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="border border-black text-black px-4 py-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-black text-white px-4 py-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
