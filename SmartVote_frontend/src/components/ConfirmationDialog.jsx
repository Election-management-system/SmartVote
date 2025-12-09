export default function ConfirmationDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5">
        <h3 className="text-base font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end gap-2 text-sm">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded-md border border-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded-md bg-slate-900 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
