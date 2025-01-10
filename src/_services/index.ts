
export interface Item {
    id: string;
    name: string;
}

export const getAllFeatures = async (): Promise<Item[]> => {
    // const response = await fetch('/api/items');
    // if (!response.ok) throw new Error('Failed to fetch items');
    // return response.json();
    return [
        { id: '1', name: 'Project 1' },
        { id: '2', name: 'Project 2' },
        { id: '3', name: 'Project 3' }
    ]
};