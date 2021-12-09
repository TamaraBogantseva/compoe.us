import { writable } from 'svelte/store';

export const todos = writable([])

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
query FetchTodos {
    todos(order_by: {created_at: desc}) {
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
`;

function fetchFetchTodos() {
    return fetchGraphQL(operationsDoc, 'FetchTodos', {});
}

async function startFetchFetchTodos() {
    const { errors, data } = await fetchFetchTodos();

    if (errors) {
        // handle those errors like a pro
        console.error(errors);
    }
    console.log(data.todos);
    todos.set(data.todos)
}

startFetchFetchTodos();