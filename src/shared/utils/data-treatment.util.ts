export const dataTreatment = (data: string) => {
  return data
    .normalize('NFD')
    .replace(/[^a-zA-Zs]/g, '')
    .toUpperCase();
};
