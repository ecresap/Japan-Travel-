<script type="module">
// --- Firebase SDK imports (official CDN) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app-check.js";

// --- Your Firebase config (Japan Favorites project) ---
const firebaseConfig = {
  apiKey: "AIzaSyDvqfl39ncWqKXMHtawVHs-E7_x_-vvYSk",
  authDomain: "japan-favorites.firebaseapp.com",
  projectId: "japan-favorites",
  storageBucket: "japan-favorites.firebasestorage.app",
  messagingSenderId: "833905258468",
  appId: "1:833905258468:web:3fe9647ad397bf4cfce1f1"
};

// --- Init + App Check (use your Site key) ---
const app = initializeApp(firebaseConfig);
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LfIPKMrAAAAADEIVItEBAUO1U2ETrkjylmtmBzE"),
  isTokenAutoRefreshEnabled: true
});

// --- Firestore ---
const db = getFirestore(app);
const favsCol = collection(db, "favorites");

// --- API: add / remove / load / group ---
export async function addFavorite({ name, url, city, neighborhood }) {
  await addDoc(favsCol, { name, url, city, neighborhood, createdAt: new Date() });
}

export async function removeFavoriteByExactMatch({ name, city, neighborhood }) {
  const q = query(
    favsCol,
    where("name","==",name),
    where("city","==",city),
    where("neighborhood","==",neighborhood)
  );
  const snap = await getDocs(q);
  await Promise.all(snap.docs.map(d => deleteDoc(doc(db, "favorites", d.id))));
}

export async function loadCityFavorites(city) {
  const q = query(favsCol, where("city","==",city), orderBy("neighborhood"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export function groupByNeighborhood(items) {
  const map = new Map();
  for (const it of items) {
    if (!map.has(it.neighborhood)) map.set(it.neighborhood, []);
    map.get(it.neighborhood).push(it);
  }
  return Array.from(map.entries()).map(([neighborhood, list]) => ({ neighborhood, items: list }));
}
</script>
