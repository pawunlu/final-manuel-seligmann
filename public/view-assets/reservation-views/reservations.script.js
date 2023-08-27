// TODO: se puede ir llamando al back y traer la info de las pelis existentes antes de que termine de cargar el DOM
// TODO: Se puede hacer que recien cuando termine de cargar el DOM ahi se ponga en "display": "block" lo que se tenga que mostrar

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  const stepInfo = new ReservationStepInfo('step-info');
  stepInfo.render();
});
