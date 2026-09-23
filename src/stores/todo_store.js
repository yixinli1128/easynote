import { defineStore } from 'pinia';
import editNote from '../components/EditNote.vue';
import SearchNote from '../components/SearchNote.vue';

export const useTodoStore = defineStore('counter', {
  state: () => ({
    notes: [
      {
        id: 1,
        item: '整理房間',
        content: '9點前要完成',
        isFinished: true,
        isPinned: false,
      },
      {
        id: 2,
        item: '英文學習',
        content: '要完成閱讀測驗',
        isFinished: true,
        isPinned: false,
      },
      {
        id: 3,
        item: '練習Vue',
        content: '完成待辦事項清單',
        isFinished: true,
        isPinned: true,
      },
      {
        id: 4,
        item: 'UI/UX 設計',
        content: '調整 Figma 導覽列與設計系統元件',
        isFinished: false,
        isPinned: true,
      },
      {
        id: 5,
        item: '期末專題討論',
        content: '與組員同步前端路由與 API 整合進度',
        isFinished: false,
        isPinned: false,
      },
      {
        id: 6,
        item: '採買日用品',
        content: '順便領取上次訂購的包裹',
        isFinished: false,
        isPinned: false,
      },
    ],
    todos: [
      { id: 1, item: '整理房間', isFinished: true },
      { id: 2, item: '英文學習', isFinished: true },
      { id: 3, item: '練習vue', isFinished: false },
    ],
    keyword: '',
    searchResults: [],
  }),
  getters: {
    pinnedNotes() {
      return this.notes.filter((note) => note.isPinned);
    },
    allNotes() {
      return this.notes.filter((note) => !note.isPinned);
    },
      completedNotes(state) {
      return state.notes.filter((note) => note.isFinished);
    },
  },
  actions: {
    toggleNote(id) {
      const finish_note = this.notes.find((note) => note.id === id);
      if (finish_note) finish_note.isFinished = !finish_note.isFinished;
    },
    pinnedNote(id) {
      const pin_note = this.notes.find((note) => note.id === id);
      if (pin_note) pin_note.isPinned = !pin_note.isPinned;
    },
    //新增筆記
    addNote(item, content) {
      // 如果item沒有值，就直接返回，不增加資料
      if (!item) return;
      // 新增資料
      this.notes.push({
        id: this.notes[this.notes.length - 1].id + 1,
        item: item,
        content: content,
        isFinished: false,
        isPinned: false,
      });
      return true;
    },
    //新增待辦事項
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
    oneNote(id) {
      const note = this.notes.find((note) => note.id === id);
      return note;
    },
    editNote(id, item, content) {
      const note = this.notes.find((note) => note.id === id);
      if (note) {
        note.item = item;
        note.content = content;
      }
    },
    deleteNote(id) {
      const index = this.notes.findIndex((note) => note.id === id);
      if (index != -1) {
        this.notes.splice(index, 1);
      }
    },
    searchNotes(keyword) {
      this.keyword = keyword;
      this.searchResults = this.notes.filter((note) => note.item.includes(this.keyword) || note.content.includes(this.keyword));
    },
  },
});
