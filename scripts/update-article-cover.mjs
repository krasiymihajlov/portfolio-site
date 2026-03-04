/**
 * Обновява coverImage на статия по slug
 * Използване: node scripts/update-article-cover.mjs <slug> <imagePath>
 * Пример: node scripts/update-article-cover.mjs opisanie-rabotni-procesi /images/blog/1.efficiency.png
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc, Timestamp } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = resolve(__dirname, '../.env.local');
  const content = readFileSync(envPath, 'utf-8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '');
  }
  return env;
}

const env = loadEnv();
const app = initializeApp({
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

const [, , slug, imagePath] = process.argv;

if (!slug || !imagePath) {
  console.error('Използване: node scripts/update-article-cover.mjs <slug> <imagePath>');
  process.exit(1);
}

async function updateCover() {
  const q = query(collection(db, 'blogArticles'), where('slug', '==', slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.error(`❌ Статия с slug "${slug}" не е намерена.`);
    process.exit(1);
  }

  await updateDoc(snapshot.docs[0].ref, {
    coverImage: imagePath,
    updatedAt: Timestamp.now(),
  });

  console.log(`✅ coverImage обновен за "${slug}" → ${imagePath}`);
  process.exit(0);
}

updateCover().catch(err => {
  console.error('❌ Грешка:', err);
  process.exit(1);
});
