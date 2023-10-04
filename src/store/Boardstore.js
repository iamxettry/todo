import { create } from "zustand";
import { ID, database, storage } from "../../appwrite";
import { getTodosGroupByColumn } from "../app/lib/getTodosGroupByColumn";
import uploadImage from "../app/lib/uploadImage";

export const useBoardStore = create((set, get) => ({
  board: {
    columns: new Map(),
  },
  
  searchstring:"",
  newTaskInput:"",
  newTaskType:"",
  image: null,
  setSearchString:(searchString)=>set({searchString}),

  setNewTaskInput: (input) => set({ newTaskInput: input }),
  setNewTaskType:(columnId) => set({ newTaskType: columnId }),
  setImage: (image) => set({ image }),


  getBoard: async () => {
    const board = await getTodosGroupByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  deleteTask:async (taskIndex,todo,id)=>{
    const newColumns = new Map(get().board.columns);
  
    newColumns.get(id)?.todos.splice(taskIndex,1)
    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
    }

    await database.deleteDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_TODOS_COLLECTIONS_ID,
        todo.$id
      );
  },
  updateTodoInDB: async (todo, columnId) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_TODOS_COLLECTIONS_ID,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

  addTask: async (todo, columnId, image) => {
    let file;
    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }
    const { $id } = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_TODOS_COLLECTIONS_ID,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );
    set({ newTaskInput: "" });

    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      };
      const column = newColumns.get(columnId);
      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }
      return {
        board:{
          columns:newColumns,
        }
      }
    });
  },

  
}));
