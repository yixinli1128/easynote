<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/todo_store';
const todoStore = useTodoStore();
const { pinnedNotes, deleteNote } = todoStore;

const noteToDelete = ref(null);

function askDelete(note) {
  noteToDelete.value = note;
  console.log(note.item);
}
function cancelDelete() {
  noteToDelete.value = null;
}
function confirmDelete() {
  deleteNote(noteToDelete.value.id);
  noteToDelete.value = null;
}
</script>
<template lang="">
  <!-- 選單 -->
  <router-link class="btn btn-primary mb-3" to="/add_note">新增筆記</router-link>
  <h3>重要筆記</h3>
  <ul class="list-group mb-4">
    <li v-for="(note, i) in todoStore.pinnedNotes" class="list-group-item d-flex justify-content-between align-item-center">
      <router-link :to="{ name: 'editNote', params: { id: note.id } }">{{ note.item }}</router-link>
      <div class="btn-group">
        <i class="fa-solid fa-thumbtack me-2 pinned" @click="todoStore.pinnedNote(note.id)"></i>
        <i class="fa-solid fa-trash-can" @click="askDelete(note)"></i>
      </div>
    </li>
  </ul>
  <h3>所有筆記</h3>
  <ul class="list-group">
    <li v-for="(note, j) in todoStore.allNotes" class="list-group-item d-flex justify-content-between align-item-center">
      <router-link :to="{ name: 'editNote', params: { id: note.id } }">{{ note.item }}</router-link>

      <div class="btn-group">
        <i class="fa-solid fa-thumbtack me-2" @click="todoStore.pinnedNote(note.id)"></i>
        <i class="fa-solid fa-trash-can" @click="askDelete(note)"></i>
      </div>
    </li>
  </ul>

  <!-- 刪除筆記 -->
  <div class="modal d-block" tabindex="-1" v-if="noteToDelete">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">刪除筆記</h5>
          <button type="button" class="btn-close"  aria-label="Close" @click="cancelDelete()"></button>
        </div>
        <div class="modal-body">
          <p>是否刪除{{ noteToDelete.item }}筆記內容</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"@click="cancelDelete()">取消</button>
          <button type="button" class="btn btn-primary" @click="confirmDelete()">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
i:hover {
  cursor: pointer;
  color: brown;
}
.pinned {
  color: rgb(243, 251, 181);
  transform: rotate(20deg);
}
</style>
