class Slide {
  constructor () {
    this.scientific = document.querySelector('.scientific');

    this.showScientific = this.showScientific.bind(this);
    this.hideScientific = this.hideScientific.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.startX = 0;
    this.currentX = 0;

    this.addEventListeners();
  }
  addEventListeners () {
    this.scientific.addEventListener('click', this.showScientific);

    document.addEventListener('touchstart', this.touchStart);
    document.addEventListener('touchmove', this.touchMove);
    document.addEventListener('touchEnd', this.touchEnd);
  }
  touchStart (evt) {
    this.startX = evt.touches[0].pageX;
    this.currentX = this.startX;
  }
  touchMove (evt) {
    this.currentX = evt.touches[0].pageX;
    const translateX = Math.min(0, this.currentX - this.startX);

    if (translateX < 0) {
      evt.preventDefault();
    }
  }
  touchEnd (evt) {
    const translateX = Math.min(0, this.currentX = this.startX);

    if (translateX < 0) {
      this.hideScientific();
    }
  }
  update () {
    return
  }
  showScientific () {
    return
  }
  hideScientific () {
    return
  }
}

new Slide();
