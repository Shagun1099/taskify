import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './styles.css';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<
    React.SetStateAction<Todo[]>
  >;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<
    React.SetStateAction<Todo[]>
  >;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  const handleDone = (
    id: number,
    isDone: boolean
  ) => {
    if (!isDone) {
      const index = todos.findIndex(
        d => d.id === id
      );
      let item = todos[index];
      todos.splice(index, 1);
      item.isDone = true;
      completedTodos.push(item);
    } else {
      const index = completedTodos.findIndex(
        d => d.id === id
      );
      let item = completedTodos[index];
      completedTodos.splice(index, 1);
      item.isDone = false;
      todos.push(item);
    }
    setTodos([...todos]);
    setCompletedTodos([...completedTodos]);
  };

  return (
    <div className='container'>
      <Droppable droppableId='TodosList'>
        {(provided, snapshot) => (
          <div
            className={`todos ${
              snapshot.isDraggingOver
                ? 'dragActive'
                : ''
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>
              Active Tasks
            </span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
                handleDone={handleDone}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver
                ? 'dragComplete'
                : ''
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>
              Completed Tasks
            </span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                todo={todo}
                index={index}
                key={todo.id}
                todos={completedTodos}
                setTodos={setCompletedTodos}
                handleDone={handleDone}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
