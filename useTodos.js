import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const init = () => {
    return JSON.parse( localStorage.getItem('todos') ) || [];
}


export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init); //Se utiliza para tener nuestros casos de CRUD centralizados

    useEffect(() => { //Se usa para dispararse cuando cambia el todos
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action ); //Envia o despacha la action al reducer
    }   

    const handleDeleteTodo = (id)=> {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = (id)=> {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }

    
  return {
    todos,
    handleDeleteTodo,
    handleToggleTodo,
    handleNewTodo,
    todosCount: todos.length,
    pendingTodosCount : todos.filter(item => !item.done).length
  }
}
