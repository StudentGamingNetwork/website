<template>
    <div>
        <button>{{ title }}</button>
    </div>
</template>
<script>
export default {
    props: ["title"]
};
</script>
<style>
button{
  padding: 8px 24px;
  font-size: 1rem;
  font-weight: 600;
  background-color: #fe8e25;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: var(--lenght-radius-base);
}
</style>
