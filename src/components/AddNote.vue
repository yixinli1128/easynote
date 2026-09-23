<script setup>
import { useTodoStore } from "../stores/todo_store";
const todo_store = useTodoStore();
import { ref } from "vue";
const new_item = ref("");

function add_item() {
  const is_push = todo_store.addTodo(new_item.value);
  if (is_push) {
    new_item.value = "";
  }
}
</script>

<template>
  <div class="card p-5 br">
    <form @submit.prevent>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="標題"
        />
      </div>
      <div class="mb-3">
        <textarea
          class="form-control"
          rows="3"
          placeholder="請輸入內容"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">儲存</button>

      <hr class="my-4" />

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
.br {
  border-radius: 0px 12px 0px 12px;
}
.fa-xmark:hover {
  color: brown;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: yellow;
}
.note-line {
  text-decoration: line-through;
  color: #888;
}
</style>
