/**
 * represents a Room Type
 * @typedef {Object} RoomType
 * @property {number} id - Room Type ID. e.g: "3d_extreme"
 * @property {string} name - Room Type. e.g: "3D Extreme"
 * @property {string} price - Room Type. e.g: "1800.50"
 * @property {boolean} isVisible - Shows if a room type is visible
 * @property {Date} createdAt - The date the Room Type was created
 * @property {Date} updatedAt - The date the Room Type was last updated
 */

document.addEventListener('DOMContentLoaded', async () => {
  // loadAndRenderComponents();
  const editingRoomType = isEditingRoomType();
  if (editingRoomType) {
    loadEditingRoomTypeStuff();
  } else {
    loadEditingNewRoomTypeStuff();
  }
});

function isEditingRoomType() {
  const editingRoomTypeId = getCurrentRoomTypeIdFromUrl();
  return editingRoomTypeId !== null;
}

function getCurrentRoomTypeIdFromUrl() {
  const pathname = window.location.pathname;
  const split = pathname.split('/');
  if (split[split.length - 1] !== 'ver') return null;

  return split[split.length - 2];
}
