import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Todo from './Todo';

describe('Todo', () => {
  const mockDeleteTodo = jest.fn();
  const mockCompleteTodo = jest.fn();
  const todo = { id: 1, text: 'Test todo', done: false };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the todo text', () => {
    render(<Todo todo={todo} />);
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('should call the deleteTodo function when the delete button is clicked', () => {
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDeleteTodo).toHaveBeenCalledWith(todo);
  });

  it('should call the completeTodo function when the set as done button is clicked', () => {
    render(<Todo todo={todo} completeTodo={mockCompleteTodo} />);
    fireEvent.click(screen.getByText('Set as done'));
    expect(mockCompleteTodo).toHaveBeenCalledWith(todo);
  });

  it('should render the done info if the todo is done', () => {
    render(<Todo todo={{ ...todo, done: true }} />);
    expect(screen.getByText('This todo is done')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should render the not done info if the todo is not done', () => {
    render(
      <Todo
        todo={{ ...todo, done: false }}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );
    expect(screen.getByText('This todo is not done')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Set as done')).toBeInTheDocument();
  });
});

