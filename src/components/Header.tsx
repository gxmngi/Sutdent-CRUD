import React from 'react';
import { useStore } from '../store';
import { Share2, Save, Users } from 'lucide-react';

export function Header() {
  const { currentDocument } = useStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Share2 className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              CollabSpace
            </span>
          </div>

          {currentDocument && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">
                  {currentDocument.collaborators.length + 1} collaborators
                </span>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}