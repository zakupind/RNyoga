export const getIndexTrack = (array, id) => {
  return array.findIndex(track => track.id === id);
};
