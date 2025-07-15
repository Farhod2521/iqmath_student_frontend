import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, name, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex justify-between items-center py-[8px] !bg-white custom-cursor"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <span>{name}</span>
      <span className="text-black">{index}</span>
    </div>
  );
};

export default SortableItem; 