import React from 'react';
import { useStore } from '../store';
import { format } from 'date-fns';
import { FileText, Plus, Search } from 'lucide-react';

export function Sidebar() {
  const { documents, setCurrentDocument } = useStore();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          New Document
        </button>

        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <nav className="mt-4 space-y-1">
          {filteredDocuments.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setCurrentDocument(doc)}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900 truncate">
                  {doc.title}
                </span>
              </div>
              <div className="ml-6 text-xs text-gray-500">
                Updated {format(doc.updatedAt, 'MMM d, yyyy')}
              </div>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}