<script setup>
import { ref, watch } from 'vue';
import { useTodoStore } from '../stores/todo_store';
const todoStore = useTodoStore();
const new_item = ref('');
//新增筆記標題跟內容
const title = ref('');
const content = ref('');
function addNote() {
  if (title.value != '' && content.value != '') todoStore.addNote(title.value, content.value);
}

function add_item() {
  const is_push = todo_store.addTodo(new_item.value);
  if (is_push) {
    new_item.value = "";
  }
}
</script>

<template lang="">
  <!-- 筆記新增/編輯畫面 -->
  <div class="card p-5 mt-5">
    <form>
      <div class="mb-3">
        <input type="text" class="form-control border-0" id="exampleInputtitle1" aria-describedby="titleHelp" placeholder="標題..." v-model="title" />
      </div>
      <div class="mb-3">
        <textarea class="form-control border-0" name="" id="" rows="5" v-model="content" @keydown.enter="addNote()">請輸入內容</textarea>
      </div>


      <!-- 待辦事項 -->
    <h4 class="mt-4"><i class="fa-solid fa-list-check me-3"></i>待辦事項</h4>
      <!-- 沒有待辦時的提示 -->
      <div v-if="todo_store.notes.length === 0" class="text-secondary mt-2">
        尚無待辦項目
      </div>
      <!-- 待辦清單：打勾 + 刪除 -->
      <div
        v-for="note in todo_store.notes"
        :key="note.id"
        class="d-flex align-items-center justify-content-start mt-2"
      >
        <input
          type="checkbox"
          class="form-check-input me-3 mt-0"
          :checked="note.isFinished"
          @change="todo_store.toggleNote(note.id)"
        />
        <p class="note w-75 m-0" :class="{ 'note-line': note.isFinished }">
          {{ note.item }}
        </p>
        <i
          class="fa-solid fa-xmark"
          @click="todo_store.deleteNote(note.id)"
        ></i>
      </div>
      <!-- 待辦輸入框 -->
      <input
        type="text"
        class="add-input form-control mt-3"
        v-model="new_item"
        @keydown.enter="add_item"
        placeholder="輸入待辦，按Enter新增"
      />

      
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
