<script>
	import TodoCard from '../Components/TodoCard.svelte';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { createApolloClient } from '../apollo';
	import { setClient } from 'svelte-apollo';
	import { gql } from '@apollo/client/core';
	import { subscribe } from 'svelte-apollo';

	const client = createApolloClient();
	setClient(client);

	const allTodos = subscribe(gql`
		subscription SubscribeAllTodos {
			todos(order_by: { created_at: desc }) {
				created_at
				description
				id
				is_completed
				is_public
				title
				user {
					name
				}
				user_id
			}
		}
	`);
</script>

<h1>List of all todos</h1>
{#if $allTodos.loading}
	<div>Loading...</div>
{:else if $allTodos.error}
	<div>Error!</div>
{:else if $allTodos.data}
	<LayoutGrid>
		{#each $allTodos.data.todos as todo}
			<Cell>
				<TodoCard {todo} />
			</Cell>
		{/each}
	</LayoutGrid>
{/if}
