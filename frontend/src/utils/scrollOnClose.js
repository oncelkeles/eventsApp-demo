const scrollOnClose = (posY) => {
  console.log(window.pageYOffset);
  setTimeout(() => {
    window.scrollTo(0, posY);
  }, 500);
};

export default scrollOnClose;