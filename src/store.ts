import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Student, SortField, SortOrder } from './types/student';

interface Store {
  students: Student[];
  sortField: SortField;
  sortOrder: SortOrder;
  setStudents: (students: Student[]) => void;
  addStudent: (student: Omit<Student, 'id' | 'createdAt'>) => void;
  updateStudent: (id: string, student: Omit<Student, 'id' | 'createdAt'>) => void;
  deleteStudent: (id: string) => void;
  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      students: [],
      sortField: 'createdAt',
      sortOrder: 'desc',
      setStudents: (students) => set({ students }),
      addStudent: (student) =>
        set((state) => ({
          students: [
            ...state.students,
            {
              ...student,
              id: crypto.randomUUID(),
              createdAt: Date.now(),
            },
          ],
        })),
      updateStudent: (id, student) =>
        set((state) => ({
          students: state.students.map((s) =>
            s.id === id
              ? {
                  ...s,
                  ...student,
                }
              : s
          ),
        })),
      deleteStudent: (id) =>
        set((state) => ({
          students: state.students.filter((s) => s.id !== id),
        })),
      setSortField: (sortField) => set({ sortField }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
    }),
    {
      name: 'student-storage',
    }
  )
);