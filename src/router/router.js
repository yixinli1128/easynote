import { createRouter, createWebHistory } from 'vue-router';
import NoteGrid from '../components/NoteGrid.vue';
import AddNote from '../components/AddNote.vue';
import EditNote from '../components/EditNote.vue';
import SearchNote from '../components/SearchNote.vue';
const routes = [
  { path: '/', name: 'home', component: NoteGrid },
  { path: '/add_note', name: 'add_note', component: AddNote },
  { path: '/edit_note/:id', name: 'editNote', component: EditNote },
  { path: '/search', name: 'search', component: SearchNote },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
