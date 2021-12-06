import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../model';
import {
  AiFillEdit,
  AiFillDelete,
} from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  todo: Todo;
  todos: Todo[];
  index: number;
  setTodos: React.Dispatch<
    React.SetStateAction<Todo[]>
  >;
  handleDone: (
    id: number,
    isDone: boolean
  ) => void;
};

const SingleTodo: React.FC<Props> = ({
  todo,
  todos,
  index,
  setTodos,
  handleDone,
}) => {
  const [edit, setEdit] =
    useState<boolean>(false);
  const [editTodo, setEditTodo] =
    useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: number) => {
    setTodos(
      todos.filter(todo => todo.id !== id)
    );
  };

  const handleEdit = (
    e: React.FormEvent,
    id: number
  ) => {
    e.preventDefault();
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, todo: editTodo }
          : todo
      )
    );
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable
      draggableId={todo.id.toString()}
      index={index}
    >
      {(provided, snapshot) => (
        <form
          className={`todos__single ${
            snapshot.isDragging ? 'drag' : ''
          }`}
          onSubmit={e => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              className='todos__single--text'
              value={editTodo}
              onChange={e =>
                setEditTodo(e.target.value)
              }
            />
          ) : todo.isDone ? (
            <s className='todos__single--text'>
              {todo?.todo}
            </s>
          ) : (
            <span className='todos__single--text'>
              {todo?.todo}
            </span>
          )}
          <div>
            <span
              className='icon'
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className='icon'
              onClick={() =>
                handleDelete(todo.id)
              }
            >
              <AiFillDelete />
            </span>
            <span
              className='icon'
              onClick={() =>
                handleDone(todo.id, todo.isDone)
              }
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
