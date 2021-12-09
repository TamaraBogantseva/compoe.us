<script>
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';

	let open = false;
	let todoTitle = '';
	let todoDescription = '';

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
  mutation AddTodo($user_id: String, $description: String, $title: String) {
    insert_todos_one(object: {description: $description, title: $title, user_id: $user_id}) {
      id
    }
  }
`;

	function executeAddTodo(user_id, description, title) {
		return fetchGraphQL(operationsDoc, 'AddTodo', {
			user_id: user_id,
			description: description,
			title: title
		});
	}

	async function startExecuteAddTodo(user_id, description, title) {
		const { errors, data } = await executeAddTodo(user_id, description, title);

		if (errors) {
			// handle those errors like a pro
			console.error(errors);
		}

		// do something great with this precious data
		console.log(data);
	}
</script>

<Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
	<Title id="simple-title">Create a new Todo!</Title>
	<Content
		id="simple-content"
		style="display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: space-around;
               height: 250px;"
	>
		<Textfield variant="outlined" bind:value={todoTitle} label="Todo Title" />
		<Textfield variant="outlined" bind:value={todoDescription} label="Todo Description" />
	</Content>
	<Actions>
		<Button action="accept" on:click={startExecuteAddTodo('1', todoDescription, todoTitle)}>
			//here I suppose to pass logged user id
			<Label>Add</Label>
		</Button>
	</Actions>
</Dialog>

<Button on:click={() => (open = true)} variant="raised">
	<Label>Add Todo</Label>
</Button>
