import React from "react"

import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";

class TodoContainer extends React.Component {

	state = {
		todos: []
	}


	//important method, gets state from key value local storage and sets intial state
	componentDidMount(){
		/* //grabs json todos from website, then sets state with them
		fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
		.then(response => response.json())
		.then(data => this.setState({todos: data}));
		*/
		const temp = localStorage.getItem("todos")
  		const loadedTodos = JSON.parse(temp)
  		if (loadedTodos) {
    		this.setState({
      			todos: loadedTodos
    		})
 		 }
	};

	//important method, updates storage with new state
	componentDidUpdate(prevProps, prevState){
		if(prevState.todos !== this.state.todos){
			const temp = JSON.stringify(this.state.todos)
			localStorage.setItem("todos", temp)
		}
	}

	
	//on checkbox change update the view with the new state
	handleChange = id => {
		//setstate updates state using previous state
		this.setState(prevState => ({
			//loop through the todos object, update with new completion state
			todos: prevState.todos.map(todo => {
				if (todo.id === id) {
					return {
						...todo,
						completed: !todo.completed,
					}
				}
				//return updated todo item
				return todo;
			})
		}));
	};

	delTodo = id => {
		this.setState({
			todos: [
			...this.state.todos.filter( todo => {
				return todo.id !== id;
			})
			]
		});
	};

	addTodoItem = title => {
		const newTodo = {
			id: uuidv4(),
			title: title,
			completed: false
		};
		this.setState({
			todos: [...this.state.todos, newTodo]
		});
	};

	setUpdate = (updatedTitle, id) => {
		this.setState({
			todos: this.state.todos.map(todo => {
				if (todo.id === id) {
					todo.title = updatedTitle
				}
				return todo
			}),
		})
	}

	render() {
		return(
			<div className="container">
				<div className="inner">
					<Header />
					<InputTodo addTodoProps={this.addTodoItem} />
					{/*todosList is being passed state and an event handler*/}
					<TodosList 
						todos={this.state.todos} 
						handleChangeProps={this.handleChange} 
						deleteTodoProps={this.delTodo} 
						setUpdate={this.setUpdate}
					/>
				</div>
			</div>
		)
	}
}
export default TodoContainer