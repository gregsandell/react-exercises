import React, { useState, useEffect } from 'react'
import {
  Button,
  Checkbox,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Header,
  Icon,
  Input,
  List,
  Menu,
  MenuMenu,
  Segment,
} from 'semantic-ui-react'

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const ToDoFixed: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'This is an important todo', completed: false },
  ])
  const [todoValue, setTodoValue] = useState<string>('')
  const [todoFilter, setTodoFilter] = useState<string>('all')

  useEffect(() => {
    console.log('todos have been updated')
    setTodoValue('')
  }, [todos])

  const addTodo = () => {
    if (todoValue.trim() === '') return

    const newTodo: Todo = {
      id: Date.now(),
      text: todoValue,
      completed: false,
    }
    setTodos([...todos, newTodo])
    // in unfixed.tsx, setValue('') called here caused an infinite loop.  Not sure why.
    // So the call was moved to a useEffect()
  }

  const toggleTodo = (todo: Todo) => {
    todo.completed = !todo.completed // flip the toggle (neglected in unfixed.tsx)
    // todos.map() rendered an array of React nodes based on the todos, but that leaves todos unchanged,
    // even if handlers in the React nodes change a todo.  The altered todo must replace that todo
    // in the stateful todos.
    setTodos(todos.filter((item) => item.id === todo.id ? todo : item))
  }

  const removeTodo = (id: number) => {
    // This method was empty in unfixed.tsx
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id
      })
    )
  }

  return (
    <Container className="todoContainer">
      <Header as="h1" textAlign="center">
                Todo List
      </Header>
      <Menu attached="top">
        <MenuMenu position="right">
          <Dropdown value={todoFilter} item icon="filter" text="Filter" simple>
            <DropdownMenu>
              <DropdownItem
                active={todoFilter == 'all'}
                value='all'
                onClick={(_, { value }) => setTodoFilter(value as string)}
              >
                                All
              </DropdownItem>
              <DropdownItem
                active={todoFilter == 'completed'}
                value="completed"
                onClick={(_, { value }) => setTodoFilter(value as string)}
              >
                                Completed
              </DropdownItem>
              <DropdownItem
                active={todoFilter == 'pending'}
                value="pending"
                onClick={(_, { value }) => setTodoFilter(value as string)}
              >
                                Pending
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </MenuMenu>
      </Menu>
      <Segment attached="bottom">
        <List divided>
          {todos.filter((todo) => {
            switch(todoFilter) {
              case 'pending':
                return todo.completed === false
              case 'completed':
                return todo.completed === true
              default:
                return true
            }
          }).map((todo, idx) => {
            return (
              <List.Item key={idx} style={{ padding: '20px 0px' }}>
                <List.Content floated="right">
                  <Button
                    size="small"
                    icon
                    color="red"
                    onClick={() => removeTodo(todo.id)}
                  >
                    <Icon name="trash" />
                  </Button>
                </List.Content>

                <List.Content style={{ textAlign: 'left', display: 'flex' }}>
                  <Checkbox
                    toggle
                    checked={!todo.completed}
                    onChange={() => toggleTodo(todo)}
                  />
                  <Header as="h3" style={{ display: 'inline-block' }}>
                    <span
                      style={{
                        marginLeft: '10px',
                        textDecoration: todo.completed
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      {todo.text}
                    </span>
                  </Header>
                </List.Content>
              </List.Item>
            )
          })}
        </List>

        <Input
          type="text"
          value={todoValue}
          onChange={(_, { value }) => setTodoValue(value as string)}
          placeholder="Enter a new todo"
        />
        <Button type="submit" primary onClick={() => addTodo()}>
                    Add Todo
        </Button>
      </Segment>

      <Segment>
        <Header as="h3" block>
                    Acceptance Criteria
        </Header>
        <List bulleted>
          <List.Item>
            <strong>View List:</strong> All tasks display in a list with text, a
                        toggle checkbox, and a delete button.
          </List.Item>
          <List.Item>
            <strong>Add Item:</strong> User can add a new task via input and
                        "Add Todo" button or Enter key.
          </List.Item>
          <List.Item>
            <strong>Toggle Complete:</strong> Clicking the checkbox toggle marks
                        a task as complete/incomplete and updates its style.
          </List.Item>
          <List.Item>
            <strong>Delete Item:</strong> Clicking the delete button removes the
                        task from the list.
          </List.Item>
          <List.Item>
            <strong>Filter Tasks:</strong> User can filter tasks to show All,
                        Completed, or Pending items.
          </List.Item>
        </List>
      </Segment>
    </Container>
  )
}

export default ToDoFixed
