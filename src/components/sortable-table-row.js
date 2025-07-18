import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIcon from './icons/drag';

const SortableTableRow = ({ id, children, className = "" }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`sortable-table-row ${className}`}
    >
      <td className="w-10 p-2">
        <div
          {...attributes}
          {...listeners}
          className="flex items-center justify-center p-1 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
          data-drag-handle
        >
          <DragIcon size={16} />
        </div>
      </td>
      {children}
    </tr>
  );
};

export default SortableTableRow; 