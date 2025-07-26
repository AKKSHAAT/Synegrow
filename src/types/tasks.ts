export interface Task {
    id: string; 
    title: string;
    description: string;
    status: 'PENDING' | 'COMPLETED' | 'IN_PROGRESS';
    createdAt: string; 
    updatedAt: string; 
}