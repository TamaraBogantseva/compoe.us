<script>
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';

	let open = false;
</script>

<Dialog
	bind:open
	aria-labelledby="large-scroll-title"
	aria-describedby="large-scroll-content"
	surface$style="width: 850px; max-width: calc(100vw - 32px);"
>
	<Title id="large-scroll-title">A Brief Selection of Placeholder Text</Title>
	<Content id="large-scroll-content">
		<p>Hello World</p>
	</Content>
	<Actions>
		<Button action="accept">
			<Label>Done</Label>
		</Button>
	</Actions>
</Dialog>

<Button on:click={() => (open = true)} variant="raised">
	<Label>Add Todo</Label>
</Button>
