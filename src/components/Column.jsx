import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCart from "./TodoCart";
import { HiPlusCircle } from "react-icons/hi";
import { useModalStore } from "../store/ModalStore";
import { useBoardStore } from "../store/Boardstore";

const idToColumnText = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};
const Column = ({ id, todos, index }) => {
  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,
  ]);

  const [openModal] = useModalStore((state) => [state.openModal]);
  const handleAddTodo = () => {
    setNewTaskType(id);
    openModal();
  };
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            className=""
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Droppable droppableId={index.toString()} type="card">
              {(provided, snapshot) => (
                <div
                  className={` p-2 rounded-2xl shadow-sm ${
                    snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="flex justify-between items-center font-bold text-xl p-2">
                    {idToColumnText[id]}
                    <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                      {/* {!searchString?todos.length:todos.filter(todo=>todo.title.toLowerCase().includes(searchString.toLowerCase()))} */}
                          {todos.length}
                    </span>
                  </h2>
                  <div className="spave-x-2">
                    {todos.map((todo, index) => {
                      if (
                        searchString &&
                        !todo.title
                          .toLowerCase()
                          .includes(searchString.toLowerCase())
                      )
                        return null;
                      return (
                        <Draggable
                          draggableId={todo.$id}
                          key={todo.$id}
                          index={index}
                        >
                          {(provided) => (
                            <TodoCart
                              todo={todo}
                              index={index}
                              id={id}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          )}
                        </Draggable>
                      );
                    })}

                    {provided.placeholder}
                    <div className="flex  items-end justify-end p-2">
                      <button
                        className="text-green-400 hover:text-green-600"
                        onClick={handleAddTodo}
                      >
                        <HiPlusCircle className="h-10 w-10" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Column;
