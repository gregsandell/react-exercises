import React, { useState } from "react";
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
} from "semantic-ui-react";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    myCheckbox: null;
}

const BrokenToDoContainer: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: "This is an important todo", completed: false },
    ]);
    const [todoValue, setTodoValue] = useState<string>("");
    const [todoFilter, setTodoFilter] = useState<string>("all");

    const addTodo = () => {
        if (todoValue.trim() === "") return;

        const newTodo: Todo = {
            id: Date.now(),
            text: todoValue,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        setTodoValue("");
    };

    const toggleTodo = (todo: Todo) => {
        // Pending:  fix method
        todo.completed = true;
    };

    const removeTodo = (id: number) => {
        setTodos(
            todos.filter((todo) => {
                return todo.id !== id;
            })
        );
    };

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
                                active={todoFilter == "all"}
                                value="all"
                                onClick={(_, { value }) => setTodoFilter(value as string)}
                            >
                                All
                            </DropdownItem>
                            <DropdownItem
                                active={todoFilter == "completed"}
                                value="completed"
                                onClick={(_, { value }) => setTodoFilter(value as string)}
                            >
                                Completed
                            </DropdownItem>
                            <DropdownItem
                                active={todoFilter == "pending"}
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
                    {todos.map((todo, idx) => {
                        // filter
                        return (
                            <List.Item key={idx} style={{ padding: "20px 0px" }}>
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

                                <List.Content style={{ textAlign: "left", display: "flex" }}>
                                    <Checkbox
                                        toggle
                                        checked={false}
                                        onChange={() => toggleTodo(todo)}
                                    />
                                    <Header as="h3" style={{ display: "inline-block" }}>
                    <span
                        style={{
                            marginLeft: "10px",
                            textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                        }}
                    >
                      {todo.text}
                    </span>
                                    </Header>
                                </List.Content>
                            </List.Item>
                        );
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
    );
};

export default BrokenToDoContainer;
