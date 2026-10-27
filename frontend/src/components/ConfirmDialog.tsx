import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  loading = false
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-ink/60 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border border-line w-11/12 md:w-1/3 bg-parchment">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-wine mr-2" strokeWidth={1.5} />
            <h3 className="font-serif text-lg font-medium text-ink">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-ink-soft hover:text-ink"
            disabled={loading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-ink-soft">{message}</p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-ink border border-line hover:border-ink focus:outline-none disabled:opacity-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-parchment bg-wine hover:bg-wine-dark focus:outline-none disabled:opacity-50 transition-colors"
          >
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-parchment mr-2"></div>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;