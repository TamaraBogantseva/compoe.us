<script>
	import { todos } from '../stores/todos';
	import TodoCard from '../Components/TodoCard.svelte';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	// import LayoutGrid from '@smui/layout-grid/src/LayoutGrid.svelte';
</script>

<h1>List of all todos</h1>
<LayoutGrid>
	{#each $todos as todo}
		<Cell>
			<TodoCard {todo} />
		</Cell>
	{/each}
</LayoutGrid>
