import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import NoteGrid from "../components/NoteGrid.vue";
import AddNote from "../components/AddNote.vue";

const routes = [
  { path: "/", name: "home", component: NoteGrid },
  { path: "/NoteGrid", name: "NoteGrid", component: NoteGrid },
  { path: "/AddNote", name: "AddNote", component: AddNote },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
