export const dataTreatment = (data: string) => {
  const treatedData = data
    .normalize('NFD')
    .replace(/[^a-zA-Zs]/g, '')
    .toLowerCase();

  const firstLetterUpperCase = treatedData.split('');

  return (
    firstLetterUpperCase[0].toUpperCase() +
    treatedData.substring(1, treatedData.length)
  );
};
