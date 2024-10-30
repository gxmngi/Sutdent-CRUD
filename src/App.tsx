import React, { useState } from 'react';
import { StudentTable } from './components/StudentTable';
import { StudentForm } from './components/StudentForm';
import { useStore } from './store';
import { Student } from './types/student';
import { GraduationCap, Plus } from 'lucide-react';

function App() {
  const { 
    students, 
    sortField, 
    sortOrder,
    addStudent, 
    updateStudent, 
    deleteStudent,
    setSortField,
    setSortOrder 
  } = useStore();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleSubmit = (student: Omit<Student, 'id' | 'createdAt'>) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, student);
    } else {
      addStudent(student);
    }
    setIsFormOpen(false);
    setEditingStudent(null);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortOrder === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * modifier;
    }
    return ((aValue as number) - (bValue as number)) * modifier;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-3xl font-bold text-gray-900">
                Student Directory
              </h1>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Student
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isFormOpen ? (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h2>
              <StudentForm
                onSubmit={handleSubmit}
                initialData={editingStudent || undefined}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingStudent(null);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <StudentTable
              students={sortedStudents}
              onEdit={handleEdit}
              onDelete={handleDelete}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={(field) => {
                if (field === sortField) {
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                } else {
                  setSortField(field);
                  setSortOrder('asc');
                }
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;