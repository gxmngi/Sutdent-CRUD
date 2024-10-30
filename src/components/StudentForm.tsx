import React from 'react';
import { Student } from '../types/student';
import { Mail, Linkedin, Twitter } from 'lucide-react';

interface StudentFormProps {
  onSubmit: (student: Omit<Student, 'id' | 'createdAt'>) => void;
  initialData?: Student;
  onCancel: () => void;
}

export function StudentForm({ onSubmit, initialData, onCancel }: StudentFormProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const newErrors: Record<string, string> = {};
    if (!data.fullName) newErrors.fullName = 'Full name is required';
    if (!data.faculty) newErrors.faculty = 'Faculty is required';
    if (!data.university) newErrors.university = 'University is required';
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string)) {
      newErrors.email = 'Invalid email format';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(data as Omit<Student, 'id' | 'createdAt'>);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          defaultValue={initialData?.fullName}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Faculty/Department</label>
        <input
          type="text"
          name="faculty"
          defaultValue={initialData?.faculty}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.faculty && <p className="mt-1 text-sm text-red-600">{errors.faculty}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">University</label>
        <input
          type="text"
          name="university"
          defaultValue={initialData?.university}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.university && <p className="mt-1 text-sm text-red-600">{errors.university}</p>}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            defaultValue={initialData?.email}
            placeholder="Email"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}

        <div className="flex items-center space-x-2">
          <Linkedin className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="linkedin"
            defaultValue={initialData?.linkedin}
            placeholder="LinkedIn URL (optional)"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Twitter className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="twitter"
            defaultValue={initialData?.twitter}
            placeholder="Twitter handle (optional)"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          {initialData ? 'Update' : 'Add'} Student
        </button>
      </div>
    </form>
  );
}