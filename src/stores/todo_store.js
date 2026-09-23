import { defineStore } from "pinia";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    // 原本的預設資料刪掉 → 初始空白
    notes: [],
  }),
  getters: {
    completedNotes(state) {
      return state.notes.filter((note) => note.isFinished);
    },
  },
  actions: {
    toggleNote(id) {
      const target = this.notes.find((n) => n.id === id);
      if (target) target.isFinished = !target.isFinished;
    },
    addTodo(item) {
      const trimItem = item.trim();
      if (!trimItem) return false;
      // 如果陣列是空的，lastId = 0，第一筆id就會是1
      const lastId = this.notes.length ? this.notes.at(-1).id : 0;
      this.notes.push({
        id: lastId + 1,
        item: trimItem,
        isFinished: false,
      });
      return true;
    },
    deleteNote(id) {
      this.notes = this.notes.filter((n) => n.id !== id);
    },
  },
});
