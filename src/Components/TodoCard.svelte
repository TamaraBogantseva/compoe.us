<script>
	export let todo;
	import Card, { PrimaryAction } from '@smui/card';
	import IconButton from '@smui/icon-button';

	async function fetchGraphQL(operationsDoc, operationName, variables) {
		const result = await fetch('http://localhost:8080/v1/graphql', {
			method: 'POST',
			body: JSON.stringify({
				query: operationsDoc,
				variables: variables,
				operationName: operationName
			})
		});

		return await result.json();
	}

	const operationsDoc = `
  mutation DeleteTodoById($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;

	function executeDeleteTodoById(id) {
		return fetchGraphQL(operationsDoc, 'DeleteTodoById', { id: id });
	}

	async function startExecuteDeleteTodoById(id) {
		const { errors, data } = await executeDeleteTodoById(id);

		if (errors) {
			// handle those errors like a pro
			console.error(errors);
		}

		// do something great with this precious data
		console.log(data);
	}
</script>

<div class="card-display">
	<div class="card-container">
		<Card>
			<PrimaryAction padded>
				<div style="display: flex; align-items: center; justify-content: right">
					<IconButton
						class="material-icons"
						size="mini"
						on:click={() => startExecuteDeleteTodoById(todo.id)}>delete</IconButton
					>
				</div>
				<h4 style="margin: 10px 0px">{todo.title}</h4>
				<p>{todo.description}</p>
				<span>{new Date(todo.created_at).toLocaleTimeString()}</span>
				<p>{todo.user.name}</p>
			</PrimaryAction>
		</Card>
	</div>
</div>

<style>
	.card-display {
		max-width: 300px;
		min-width: 200px;
	}
</style>
