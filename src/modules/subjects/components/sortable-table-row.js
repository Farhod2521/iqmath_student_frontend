import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIcon from "../../../components/icons/drag";

const SortableTableRow = ({ 
  id, 
  children, 
  className = "", 
  isActive = false,
  onClick,
  onDragStart,
  showDragHandle = true 
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const handleClick = (e) => {
    if (onClick && !isDragging && !e.target.closest('[data-drag-handle]')) {
      onClick(e);
    }
  };

  const handleDragStart = (e) => {
    if (onDragStart) {
      onDragStart(e);
    }
  };

  return (
    <tr
      ref={setNodeRef}
      {...attributes}
      className={`sortable-table-row ${className} ${isDragging ? 'opacity-50' : ''} ${isActive ? 'bg-[#F0F9FF]' : ''}`}
      style={{ 
        transform: CSS.Transform.toString(transform), 
        transition,
        cursor: onClick ? 'pointer' : 'default',
        zIndex: isDragging ? 1000 : 'auto'
      }}
      onClick={handleClick}
      onDragStart={handleDragStart}
    >
      <td className="p-[12px] pl-[24px] w-[40px]">
        {showDragHandle && (
          <div
            {...listeners}
            data-drag-handle
            className="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors cursor-grab active:cursor-grabbing"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title="Drag to reorder"
          >
            <DragIcon size={14} color="#8E8E93" />
          </div>
        )}
      </td>
      {children}
    </tr>
  );
};

export default SortableTableRow; 