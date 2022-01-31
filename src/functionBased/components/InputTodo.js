import React, { useState } from "react"

import { FaPlusCircle } from "react-icons/fa"

const InputTodo = props => {
	//title and setTitle(a function) are set by useState being destructured
	// its a hook
	//useState returns a pair: the current state value and a function that lets you update it.
	//You can call this function from an event handler or somewhere else.
	const [inputText, setInputText] = useState(
	{
		title: "",
	})//inital useState state is zero

	// set an updated title on edit 
	const onChange = e => {
		setInputText({
			...inputText,
			[e.target.name]: e.target.value,
		})
	}

	//add a new todo item on submit
	const handleSubmit = e => {
		e.preventDefault()
		//trim removes whitespace 
		if (inputText.title.trim()){
			props.addTodoProps(inputText.title)
			setInputText({
				title: "",
			})
		} else {
			alert("Please write item")
		}
	}

	return (
		<form onSubmit={handleSubmit} className="form-container">
			<input
			type="text"
			className="input-text"
			placeholder="Add todo..."
			value={inputText.title}
			name="title"
			onChange={onChange}
			/>
			<button className="input-submit">
			<FaPlusCircle 
			    style={{ color: "darkcyan", fontSize: "20px", marginTop: "2px" }}
			/>
			</button>
		</form>
	)
}

export default InputTodo