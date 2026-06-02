"use client";

import { useCallback, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  type DocumentData,
} from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { toast } from "sonner";

export function useFirestoreCrud<T extends { id: string }>(
  collectionName: string,
  fallback: T[] = [],
  orderField = "createdAt"
) {
  const [items, setItems] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    const db = getFirebaseDb();
    if (!isFirebaseConfigured() || !db) {
      setItems(fallback);
      setLoading(false);
      return;
    }

    try {
      const snap = await getDocs(
        collection(db, collectionName)
      );
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
      setItems(data.length ? data : fallback);
    } catch (e) {
      console.error(e);
      setItems(fallback);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [collectionName, fallback, orderField]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const create = async (data: Omit<T, "id">) => {
    const db = getFirebaseDb();
    if (!db) {
      toast.error("Firebase not configured");
      return;
    }
    await addDoc(collection(db, collectionName), data as DocumentData);
    toast.success("Created successfully");
    await fetchItems();
  };

  const update = async (id: string, data: Partial<T>) => {
    const db = getFirebaseDb();
    if (!db) return;
    await updateDoc(doc(db, collectionName, id), data as DocumentData);
    toast.success("Updated successfully");
    await fetchItems();
  };

  const remove = async (id: string) => {
    const db = getFirebaseDb();
    if (!db) return;
    await deleteDoc(doc(db, collectionName, id));
    toast.success("Deleted successfully");
    await fetchItems();
  };

  return { items, loading, create, update, remove, refetch: fetchItems };
}
