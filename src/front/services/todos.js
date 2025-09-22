const host = "https://playground.4geeks.com/todo";
const username = "federicoZoppi";

// Trae todas las tareas del servidor
export const getTodos = async () => {
  try {
    const response = await fetch(GET_URL);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    setTodos(Array.isArray(data) ? data : data.todos || []);
  } catch (error) {
    console.error("Error al cargar tareas:", error);
  }
};

// Agrega una nueva tarea
export const addTask = async () => {
  if (newTask.trim() === "") return;

  try {
    const response = await fetch(POST_URL, {
      method: "POST",
      body: JSON.stringify({ label: newTask, is_done: false }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    setNewTask("");
    getTodos();
  } catch (error) {
    console.error("Error al agregar tarea:", error);
  }
};

// Guarda los cambios al editar una tarea
export const handleSubmitEdit = async (e) => {
  e.preventDefault();
  if (editTask.trim() === "") return;

  try {
    await fetch(`${host}/todos/${editTodo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        label: editTask,
        is_done: editCompleted,
      }),
      headers: { "Content-Type": "application/json" },
    });

    setEditTask("");
    setEditCompleted(false);
    setEditTodo({});
    setIsEdit(false);
    getTodos();
  } catch (error) {
    console.error("Error modificando tarea:", error);
  }
};

// Elimina todas las tareas
export const clearAll = () => {
  Promise.all(
    todos.map((todo) =>
      fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
        method: "DELETE",
      })
    )
  ).then(() => setTodos([]));
};

// Elimina una tarea específica
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${host}/todos/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getTodos();
    } else {
      console.error("Error eliminando tarea:", response.status);
    }
  } catch (error) {
    console.error("Error eliminando tarea:", error);
  }
};