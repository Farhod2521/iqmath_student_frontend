import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./sortable";

const DndList = ({ title, itemsData }) => {
  const [items, setItems] = useState(itemsData);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="w-[304px] bg-white rounded-lg border border-[#E9E9E9] ">
      <div className="px-[16px] py-[12px] bg-[#F5F6F8] flex justify-between">
        <h2 className="text-[17px] font-medium ">{title}</h2>
        <div className="w-[31px] h-[31px] border border-[#D1D1D6FF] rounded-[8px] flex justify-center items-center">
          12
        </div>
      </div>
      <div className="px-[16px] text-black">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item, index) => (
              <SortableItem
                key={item.id}
                id={item.id}
                name={item.name}
                index={index + 1}
              />
            ))}
          </SortableContext>
        </DndContext>
        <div className="bg-white ">
          <button className=" w-full bg-gray-200 text-black py-2 rounded-md mb-[12px] mt-[8px]">
            Посмотреть все
          </button>
        </div>
      </div>
    </div>
  );
};

export default DndList; 