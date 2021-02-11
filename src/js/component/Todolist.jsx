import React, { useState } from "react";
import shortid from "shortid";
const Todolist = () => {
	let [tarea, setTarea] = useState("");
	let [listaTareas, setListaTareas] = useState([]);
	let restantes;
	if (listaTareas.length === 0) {
		restantes = "No hay tareas pendientes";
	} else {
		restantes = "Quedan " + listaTareas.length + " tareas restantes";
	}
	const obtenerValor = e => {
		if (e.key.toLowerCase() === "enter") {
			let valor = e.target.value;
			setTarea((tarea = valor));
			setListaTareas([
				...listaTareas,
				{
					id: shortid.generate(),
					nombreTarea: tarea
				}
			]);
		}
		setTarea("");
	};
	function handleRemove(id) {
		const newList = listaTareas.filter(item => item.id !== id);

		setListaTareas(newList);
	}

	fetch("https://assets.breatheco.de/apis/fake/todos/user/ismaelartavia", {
		method: "PUT",
		body: JSON.stringify(listaTareas),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(resp => {
			//console.log(resp.ok); // will be true if the response is successfull
			//console.log(resp.status); // the status code = 200 or code = 400 etc.
			//console.log(resp.text()); // will try return the exact result as string
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			//here is were your code should start after the fetch finishes
			//console.log(data); //this will print on the console the exact object received from the server
		})
		.catch(error => {
			//error handling
			//console.log(error);
		});

	return (
		<div className="container">
			<h1>Todos</h1>
			<div className="input-group input-group-lg">
				<input
					placeholder="Agregar tarea"
					onKeyPress={obtenerValor}
					type="text"
					className="form-control"
					aria-label="Sizing example input"
					aria-describedby="inputGroup-sizing-lg"
				/>
			</div>

			<ul className="list-group d-flex">
				{listaTareas.map(item => (
					<li className="list-group-item" key={item.id}>
						<span className="lead">{item.nombreTarea}</span>
						<button
							className="btn btn-danger"
							type="button"
							onClick={() => handleRemove(item.id)}>
							<i className="far fa-trash-alt"></i>
						</button>
					</li>
				))}

				<li className="list-group-item"></li>
				<li className="list-group-item"></li>
				<li className="list-group-item restantes">
					<p>{restantes}</p>
				</li>
			</ul>
			<hr className="hr1" />
			<hr className="hr2" />
			<hr className="hr3" />
			<hr className="hr4" />
			<hr className="hr5" />
			<hr className="hr6" />
			<hr className="hr7" />
			<hr className="hr8" />
			<hr className="hr9" />
			<hr className="hr10" />
		</div>
	);
};

export default Todolist;
