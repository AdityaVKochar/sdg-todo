import TaskItem from "./TaskItem";

export default function TaskList({ tasks, formatDate, onDelete, onEdit }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-black">No tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          formatDate={formatDate}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
