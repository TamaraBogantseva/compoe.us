<script>
	import AddTodoDialog from '../Components/AddTodoDialog.svelte';
</script>

<header>
	<nav>
		<a href="/">Home page</a>
		<a href="/about">About</a>
	</nav>
	<AddTodoDialog />
</header>

<slot />

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
</style>
