<script setup>
import { useTodoStore } from '../stores/todo_store';
const todoStore = useTodoStore();
</script>
<template lang="">
  <div class="container pt-5">
    <h3 class="mb-3">搜尋結果:{{ todoStore.keyword }}</h3>
    <div class="row">
      <div class="col-4 mb-3" v-for="note in todoStore.searchResults">
        <router-link :to="{ name: 'editNote', params: { id: note.id } }">
          <div class="card">
            <i class="fa-solid fa-thumbtack me-2 pinned" v-if="note.isPinned"></i>
            <i class="fa-solid fa-thumbtack me-2" v-else></i>
            <div class="card-body">
              <h5 class="card-title">{{ note.item }}</h5>
              <p class="card-text">{{ note.content }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transform: rotate(-5deg);
  transition: all 0.3s;
}
.card:hover {
  box-shadow: 3px 3px 15px #cfcfcf;
  transform: scale(1.1);
}
.fa-thumbtack {
  color: lightblue;
}
.pinned {
  color: rgb(243, 251, 181);
  transform: rotate(20deg);
}
</style>
