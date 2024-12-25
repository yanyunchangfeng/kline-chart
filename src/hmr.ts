export function setupHMR() {
  if (module.hot) {
    module.hot.accept();
  }
}
