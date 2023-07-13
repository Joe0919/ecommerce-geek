let swiper1 = new Swiper(".slide-content1", {
  spaceBetween: 15,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: false,
  navigation: {
    nextEl: ".navBtn-next1",
    prevEl: ".navBtn-prev1",
  },
  
  slidesPerView: 6,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    440: {
      slidesPerView: 2,
    },
    575: {
      slidesPerView: 2,
    },
    769: {
      slidesPerView: 4,
    },
    993: {
      slidesPerView: 4,
    },
    1282: {
      slidesPerView: 6,
    }
  },
});
let swiper2 = new Swiper(".slide-content2", {
  slidesPerView: 6,
  spaceBetween: 25,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: false,
  navigation: {
    nextEl: ".navBtn-next2",
    prevEl: ".navBtn-prev2",
  },

  slidesPerView: 6,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    440: {
      slidesPerView: 2,
    },
    575: {
      slidesPerView: 2,
    },
    769: {
      slidesPerView: 4,
    },
    993: {
      slidesPerView: 4,
    },
    1282: {
      slidesPerView: 6,
    }
  },
});
let swiper3 = new Swiper(".slide-content3", {
  slidesPerView: 6,
  spaceBetween: 25,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: false,
  navigation: {
    nextEl: ".navBtn-next3",
    prevEl: ".navBtn-prev3",
  },

  slidesPerView: 6,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    440: {
      slidesPerView: 2,
    },
    575: {
      slidesPerView: 2,
    },
    769: {
      slidesPerView: 4,
    },
    993: {
      slidesPerView: 4,
    },
    1282: {
      slidesPerView: 6,
    }
  },
});
let swiperSimilares = new Swiper(".slide-contentsimilares", {
  slidesPerView: 6,
  spaceBetween: 25,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: false,
  navigation: {
    nextEl: ".navBtn-nextS",
    prevEl: ".navBtn-prevS",
  },

  slidesPerView: 6,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    440: {
      slidesPerView: 2,
    },
    575: {
      slidesPerView: 2,
    },
    769: {
      slidesPerView: 4,
    },
    993: {
      slidesPerView: 4,
    },
    1282: {
      slidesPerView: 6,
    }
  },
});
