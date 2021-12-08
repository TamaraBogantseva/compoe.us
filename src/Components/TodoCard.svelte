<script>
	export let todo;
	import Card, { PrimaryAction } from '@smui/card';
	import Button, { Label } from '@smui/button';
</script>

<div class="card-display">
	<div class="card-container">
		<Card>
			<PrimaryAction on:click={() => console.log('clicked')} padded>
				<h4>{todo.title}</h4>
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
