<script setup lang="ts">
const { data: users } = await useFetch('https://jsonplaceholder.typicode.com/users')
</script>

<template>
  <div>
    <NuxtLink to="/posts">Posts</NuxtLink>
    <hr />
    <pre>{{ users }}</pre>
  </div>
</template>
