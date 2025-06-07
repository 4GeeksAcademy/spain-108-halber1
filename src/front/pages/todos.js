

  const host = 'https://playground.4geeks.com/todo';
  const user = 'Halber1';

  
 export const getTodos = async () => {
    const uri = `${host}/users/${user}`
    const options = {method: 'GET'}
    try {
      const response = await fetch(uri, options);
      if (!response.ok) {
        console.log('Error', response.status)
        if (response.status == 404) {
         // tengo que crear el usuario
         addUser(); 
        }
        return
      } 
      const data = await response.json()
      console.log(data)
      setTodos(data.todos)
     } catch {
      console.log('error')
    }
  }

  export const addUser = async () => {
      const uri = `${host}/users/${user}`
      const options = {method: 'POST'}
      const response = await fetch(uri, options )
  }

  export const addTodo = async (dataToSend) => {
    const uri = `${host}/todos/${user}`;
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(dataToSend)
    }
    try {
      const response = await fetch(uri, options)
      getTodos();
    } catch {
      console.log('error')
    }
  }

  export const modifyTodo = async (id, dataToSend) => {
     const uri = `${host}/todos/${id}`;
     const options = {
      method: 'PUT',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(dataToSend)
     };
     try{
      const response = await fetch(uri, options)
      getTodos()
     } catch {
       console.log('error'); 
     }
  }

  export const deleteTodo = async (id) => {
    const uri = `${host}/todos/${id}`;
    const options = {method: 'DELETE'}
    try {
      const response = await fetch(uri, options)
      getTodos();
    } catch {
      console.log('error')
    }
  }
