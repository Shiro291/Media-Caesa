import { useState } from 'react';

export function useChartEditor<T>() {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingField, setEditingField] = useState<string>('');
    const [editValue, setEditValue] = useState<string>('');

    const startEdit = (index: number, field: string, value: string | number) => {
        setEditingIndex(index);
        setEditingField(field);
        setEditValue(String(value));
    };

    const saveEdit = (data: T[], setData: React.Dispatch<React.SetStateAction<T[]>>) => {
        if (editingIndex !== null && editingField) {
            const isNumeric = !isNaN(Number(editValue));
            const newData = [...data];
            newData[editingIndex] = { ...newData[editingIndex], [editingField]: isNumeric ? Number(editValue) : editValue };
            setData(newData);
        }
        setEditingIndex(null);
        setEditingField('');
        setEditValue('');
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        setEditingField('');
        setEditValue('');
    };

    const addDataPoint = (data: T[], setData: React.Dispatch<React.SetStateAction<T[]>>, template: T) => {
        setData([...data, template]);
    };

    const removeDataPoint = (data: T[], setData: React.Dispatch<React.SetStateAction<T[]>>, index: number) => {
        if (data.length > 1) {
            setData(data.filter((_, i) => i !== index));
        }
    };

    return {
        editingIndex,
        editingField,
        editValue,
        setEditValue,
        startEdit,
        saveEdit,
        cancelEdit,
        addDataPoint,
        removeDataPoint
    };
}
