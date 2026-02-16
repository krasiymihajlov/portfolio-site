import { injectable } from 'tsyringe';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { BlogArticle } from '@/domain/entities/BlogArticle';
import type { IBlogRepository } from '@/domain/repositories/IBlogRepository';

@injectable()
export class FirebaseBlogRepository implements IBlogRepository {
  private readonly collectionName = 'blogArticles';

  async findAll(): Promise<BlogArticle[]> {
    const q = query(
      collection(db, this.collectionName),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => this.mapToEntity(doc.id, doc.data()));
  }

  async findAllPublished(): Promise<BlogArticle[]> {
    const q = query(
      collection(db, this.collectionName),
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => this.mapToEntity(doc.id, doc.data()));
  }

  async findById(id: string): Promise<BlogArticle | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return this.mapToEntity(docSnap.id, docSnap.data());
  }

  async findBySlug(slug: string): Promise<BlogArticle | null> {
    const q = query(
      collection(db, this.collectionName),
      where('slug', '==', slug)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return this.mapToEntity(doc.id, doc.data());
  }

  async findByCategory(category: string): Promise<BlogArticle[]> {
    const q = query(
      collection(db, this.collectionName),
      where('category', '==', category),
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => this.mapToEntity(doc.id, doc.data()));
  }

  async findByTag(tag: string): Promise<BlogArticle[]> {
    const q = query(
      collection(db, this.collectionName),
      where('tags', 'array-contains', tag),
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => this.mapToEntity(doc.id, doc.data()));
  }

  async create(
    article: Omit<BlogArticle, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<BlogArticle> {
    const now = Timestamp.now();
    const docData = {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: article.tags,
      published: article.published,
      coverImage: article.coverImage || null,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, this.collectionName), docData);
    return new BlogArticle(
      docRef.id,
      article.title,
      article.slug,
      article.excerpt,
      article.content,
      article.category,
      article.tags,
      article.published,
      now.toDate(),
      now.toDate(),
      article.coverImage
    );
  }

  async update(id: string, article: Partial<BlogArticle>): Promise<BlogArticle> {
    const docRef = doc(db, this.collectionName, id);
    const updateData: any = {
      ...article,
      updatedAt: Timestamp.now(),
    };

    // Remove fields that shouldn't be updated
    delete updateData.id;
    delete updateData.createdAt;

    await updateDoc(docRef, updateData);

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error(`Failed to update article with id: ${id}`);
    }

    return updated;
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }

  async search(searchQuery: string): Promise<BlogArticle[]> {
    // Firestore doesn't support full-text search natively
    // This is a simple implementation that fetches all published articles
    // and filters them on the client side
    const allArticles = await this.findAllPublished();
    const lowerQuery = searchQuery.toLowerCase();

    return allArticles.filter((article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery)
    );
  }

  async setPublished(id: string, published: boolean): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, {
      published,
      updatedAt: Timestamp.now(),
    });
  }

  private mapToEntity(id: string, data: any): BlogArticle {
    return new BlogArticle(
      id,
      data.title,
      data.slug,
      data.excerpt,
      data.content,
      data.category,
      data.tags,
      data.published,
      data.createdAt?.toDate(),
      data.updatedAt?.toDate(),
      data.coverImage
    );
  }
}
