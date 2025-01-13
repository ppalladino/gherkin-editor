export function findById<T extends { id: string }>(list: T[], id: string): T | undefined {
    return list.find(item => item.id === id);
}