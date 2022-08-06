<script setup lang="ts">
const { data: posts } = await useFetch('https://jsonplaceholder.typicode.com/posts', {
  transform: posts => posts.slice(0, 10),
})
</script>

<template>
  <div>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink v-for="post in posts" :key="post.id" :to="`/post/${post.id}`">
      {{ post.title }}
    </NuxtLink>
  </div>
</template>
