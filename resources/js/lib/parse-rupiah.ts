export const parseRupiah = (value: string): number => {
    const numericString = value.replace(/[^0-9]/g, '');
    return Number(numericString);
};
