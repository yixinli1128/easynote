<script setup>
import { ref, watch, onMounted } from 'vue';
import { useTodoStore } from '../stores/todo_store';
import { useRoute, useRouter } from 'vue-router';

const todoStore = useTodoStore();
const route = useRoute();
const router =useRouter();
const noteId = Number(route.params.id);

//新增筆記標題跟內容
const title = ref('');
const content = ref('');
const currentNote = todoStore.oneNote(noteId);
title.value = currentNote.item;
content.value = currentNote.content;
watch([title, content], () => {
  todoStore.editNote(noteId, title.value, content.value);
});
function goBack() {
  router.push({ name: 'home' });
}
</script>

<template lang="">
  <!-- 筆記編輯畫面 -->
  <div class="card p-5 mt-5">
    <form>
      <div class="mb-3">
        <input type="text" class="form-control border-0" id="exampleInputtitle1" aria-describedby="titleHelp" placeholder="標題..." v-model="title" />
      </div>
      <div class="mb-3">
        <textarea class="form-control border-0" name="" id="" rows="5" v-model="content" @keydown.enter="addNote()">請輸入內容</textarea>
      </div>
      <!-- 待辦事項 -->
      <div class="mb-3">
        <hr class="mb-3" />
        <h5><i class="fa-solid fa-list-check"></i> 待辦項目</h5>
        <div class="d-flex align-items-center justify-content-start mb-3">
          <input type="checkbox" class="form-check-input me-3 mt-0" />
          <p class="w-75 me-3">項目1</p>
          <i class="fa-solid fa-xmark"></i>
        </div>
        <input type="text" v-model="new_item" class="form-control" placeholder="新增待辦項目..." />
      </div>
      <button class="btn btn-primary w-25" @click="goBack()">返回</button>
    </form>
  </div>
</template>

<style scoped>
.fa-xmark:hover {
  color: brown;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: bisque;
}
</style>
