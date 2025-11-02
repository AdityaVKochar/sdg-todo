import Input from "./Input";

export default function Popup({
  isOpen,
  isEditing,
  formData,
  onFormChange,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center p-4">
      <div className="bg-white border border-black max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-black">
            {isEditing ? "Edit Task" : "New Task"}
          </h2>
          <button onClick={onClose} className="text-black">
            x
          </button>
        </div>

        <Input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => onFormChange("title", e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => onFormChange("content", e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 text-black mb-4"
        />

        <Input
          type="date"
          value={formData.dueAt}
          onChange={(e) => onFormChange("dueAt", e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={onSubmit}
            className="flex-1 bg-black hover:bg-gray-800 text-white py-2 px-4"
          >
            {isEditing ? "Update" : "Create"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 hover:border-black py-2 px-4 text-black"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
