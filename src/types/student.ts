export interface Student {
  id: string;
  fullName: string;
  faculty: string;
  university: string;
  email: string;
  linkedin?: string;
  twitter?: string;
  createdAt: number;
}

export type SortField = 'fullName' | 'faculty' | 'university' | 'createdAt';
export type SortOrder = 'asc' | 'desc';