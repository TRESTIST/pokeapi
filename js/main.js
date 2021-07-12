// https://pokeapi.co/api/v2/pokemon?offset=0&limit=20

//base url api
const baseUrl = "https://pokeapi.co/api/v2";
// request
const getRequest = (url, query, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}?${query}`);

  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.response);
    cb(response);
  });

  xhr.addEventListener("error", (err) => {
    console.log(err);
  });

  xhr.send();
};

// DOM selector
const $grid = document.querySelector(".grid");
const $topUpInner = document.querySelector(".top__up-inner");
const $btnUp = document.querySelector(".top__up-btn");
const $head = document.querySelectorAll(".head");
const $pagination = document.querySelector(".pagination");
const $prevBtn = document.querySelector(".prevBtn");
const $page = document.querySelector(".page");
const $nextBtn = document.querySelector(".nextBtn");
const $searchInput = document.querySelector(".search__input");
const $searchCancelBtn = document.querySelector(".header__canсel-btn");
// some data
const LINE = 2;
const LIMIT = 20;
const TOTAL_POKEMONS = 1118;
const TOTAL_PAGES = Math.floor(TOTAL_POKEMONS / LIMIT);
const mediaQuery = window.matchMedia('(max-width: 610px)')
let pageCounter = 1;
let offsetCounter = 0;

// load
window.addEventListener("load", () => {
  $btnUp.style.display = "none";
  $topUpInner.insertAdjacentHTML(
    "beforeend",
    ` <p class="top__up-title">Количество : ${TOTAL_POKEMONS}</p>`
  );
  getRequest(
    `${baseUrl}/pokemon`,
    `offset=${offsetCounter}&limit=${LIMIT}`,
    (res) => {
      const results = res.results;
      const card = results.map((item) => cardTemplate(item)).join("");
      $grid.innerHTML = card;
    }
  );
});

//card Template
function cardTemplate(pokemon) {
  return `
  <div class="top__card">
  <div class="card__header">
    <p class="card__header-text">${pokemon.name}</p>
  </div>

  <button onclick="singlePokemon('${pokemon.url}')" class="card__footer">More</button>
</div>
  `;
}

// single page
function singlePokemon(url) {
  $btnUp.style.display = "block";
  $grid.style.display = "flex";
  $grid.style.justifyContent = "space-around";
  $pagination.style.display = "none";

  getRequest(url, "", (res) => {
    console.log(res);

    if (res.sprites.other.dream_world.front_default === null) {
      $grid.innerHTML = `
      <div class="top__card single__card">
        <div class="card__header">
          <p class="card__header-text">${res.name}</p>
        </div>
        <div class="card__body">
          <img class="card__body-img" src="${
            res.sprites.front_default
          }" alt="#">
        </div>
        <button onclick="showArts('${url}')" class="card__footer single__footer">Посмотреть арты</button>
      </div>
      <div class="info">
        <h5 class="info__text">Информация #${res.id}</h5>
        <p class="info__title">Рост: ${res.height} </p>
        <p class="info__title">Вес: ${res.weight} </p>
        <div class="type">
          <p class="pokemon__type ${res.types[0].type.name}">${
        res.types[0].type.name
      }</p>
        </div>
        <h5 class="info__text">Базовые характеристики:</h5>
        <div class="stats">
        <div class="stats__item">
        <p class="pokemon__stats ">
            ${res.stats[0].stat.name}
          </p>
          <div class="stats__items">
            <p class="pokemon__base">${res.stats[0].base_stat}</p>
            <div class="pokemon__stats-line">
              <span style="width: ${res.stats[0].base_stat * LINE}px;"
                class="pokemon__stats-upper ${res.stats[0].stat.name}"></span>
            </div>
          </div>
          </div>

          <div class="stats">
          <div class="stats__item">
            <p class="pokemon__stats ">
              ${res.stats[1].stat.name}
            </p>
            <div class="stats__items">
              <p class="pokemon__base">${res.stats[1].base_stat}</p>
              <div class="pokemon__stats-line">
                <span style="width: ${res.stats[1].base_stat * LINE}px;"
                 class="pokemon__stats-upper ${res.stats[1].stat.name}"></span>
              </div>
            </div>
           </div>

           <div class="stats">
           <div class="stats__item">
             <p class="pokemon__stats ">
               ${res.stats[2].stat.name}
             </p>
             <div class="stats__items">
               <p class="pokemon__base">${res.stats[2].base_stat}</p>
               <div class="pokemon__stats-line">
                 <span style="width: ${res.stats[2].base_stat * LINE}px;"
                  class="pokemon__stats-upper ${res.stats[2].stat.name}"></span>
               </div>
             </div>
            </div>

            <div class="stats">
            <div class="stats__item">
              <p class="pokemon__stats ">
                ${res.stats[3].stat.name}
              </p>
              <div class="stats__items">
                <p class="pokemon__base">${res.stats[3].base_stat}</p>
                <div class="pokemon__stats-line">
                  <span style="width: ${res.stats[3].base_stat * LINE}px;"
                   class="pokemon__stats-upper ${
                     res.stats[3].stat.name
                   }"></span>
                </div>
              </div>
             </div>

             <div class="stats">
             <div class="stats__item">
               <p class="pokemon__stats ">
                 ${res.stats[4].stat.name}
               </p>
               <div class="stats__items">
                 <p class="pokemon__base">${res.stats[4].base_stat}</p>
                 <div class="pokemon__stats-line">
                   <span style="width: ${res.stats[4].base_stat * LINE}px;"
                    class="pokemon__stats-upper ${
                      res.stats[4].stat.name
                    }"></span>
                 </div>
               </div>
              </div>

              <div class="stats">
              <div class="stats__item">
                <p class="pokemon__stats ">
                  ${res.stats[5].stat.name}
                </p>
                <div class="stats__items">
                  <p class="pokemon__base">${res.stats[5].base_stat}</p>
                  <div class="pokemon__stats-line">
                    <span style="width: ${res.stats[5].base_stat * LINE}px;"
                     class="pokemon__stats-upper ${
                       res.stats[5].stat.name
                     }"></span>
                  </div>
                </div>
               </div>
        `;
    } else if (res.types.length != 2) {
      $grid.innerHTML = `
      <div class="top__card single__card">
        <div class="card__header">
          <p class="card__header-text">${res.name}</p>
        </div>
        <div class="card__body">
          <img class="card__body-img" src="${
            res.sprites.other.dream_world.front_default
          }" alt="#">
        </div>
        <button onclick="showArts('${url}')" class="card__footer single__footer">Посмотреть арты</button>
      </div>
      <div class="info">
        <h5 class="info__text">Информация #${res.id}</h5>
        <p class="info__title">Рост: ${res.height} </p>
        <p class="info__title">Вес: ${res.weight} </p>
        <div class="type">
          <p class="pokemon__type ${res.types[0].type.name}">${
        res.types[0].type.name
      }</p>
        </div>
        <h5 class="info__text">Базовые характеристики:</h5>
        <div class="stats">
        <div class="stats__item">
        <p class="pokemon__stats ">
            ${res.stats[0].stat.name}
          </p>
          <div class="stats__items">
            <p class="pokemon__base">${res.stats[0].base_stat}</p>
            <div class="pokemon__stats-line">
              <span style="width: ${res.stats[0].base_stat * LINE}px;"
                class="pokemon__stats-upper ${res.stats[0].stat.name}"></span>
            </div>
          </div>
          </div>

          <div class="stats">
          <div class="stats__item">
            <p class="pokemon__stats ">
              ${res.stats[1].stat.name}
            </p>
            <div class="stats__items">
              <p class="pokemon__base">${res.stats[1].base_stat}</p>
              <div class="pokemon__stats-line">
                <span style="width: ${res.stats[1].base_stat * LINE}px;"
                 class="pokemon__stats-upper ${res.stats[1].stat.name}"></span>
              </div>
            </div>
           </div>

           <div class="stats">
           <div class="stats__item">
             <p class="pokemon__stats ">
               ${res.stats[2].stat.name}
             </p>
             <div class="stats__items">
               <p class="pokemon__base">${res.stats[2].base_stat}</p>
               <div class="pokemon__stats-line">
                 <span style="width: ${res.stats[2].base_stat * LINE}px;"
                  class="pokemon__stats-upper ${res.stats[2].stat.name}"></span>
               </div>
             </div>
            </div>

            <div class="stats">
            <div class="stats__item">
              <p class="pokemon__stats ">
                ${res.stats[3].stat.name}
              </p>
              <div class="stats__items">
                <p class="pokemon__base">${res.stats[3].base_stat}</p>
                <div class="pokemon__stats-line">
                  <span style="width: ${res.stats[3].base_stat * LINE}px;"
                   class="pokemon__stats-upper ${
                     res.stats[3].stat.name
                   }"></span>
                </div>
              </div>
             </div>

             <div class="stats">
             <div class="stats__item">
               <p class="pokemon__stats ">
                 ${res.stats[4].stat.name}
               </p>
               <div class="stats__items">
                 <p class="pokemon__base">${res.stats[4].base_stat}</p>
                 <div class="pokemon__stats-line">
                   <span style="width: ${res.stats[4].base_stat * LINE}px;"
                    class="pokemon__stats-upper ${
                      res.stats[4].stat.name
                    }"></span>
                 </div>
               </div>
              </div>

              <div class="stats">
              <div class="stats__item">
                <p class="pokemon__stats ">
                  ${res.stats[5].stat.name}
                </p>
                <div class="stats__items">
                  <p class="pokemon__base">${res.stats[5].base_stat}</p>
                  <div class="pokemon__stats-line">
                    <span style="width: ${res.stats[5].base_stat * LINE}px;"
                     class="pokemon__stats-upper ${
                       res.stats[5].stat.name
                     }"></span>
                  </div>
                </div>
               </div>
        `;
    } else {
      $grid.innerHTML = `

      <div class="top__card single__card">
        <div class="card__header">
          <p class="card__header-text">${res.name}</p>
        </div>
        <div class="card__body">
          <img class="card__body-img" src="${
            res.sprites.other.dream_world.front_default
          }" alt="#">
        </div>
        <button onclick="showArts('${url}')" class="card__footer single__footer">Посмотреть арты</button>
      </div>
      <div class="info">
        <h5 class="info__text">Информация #${res.id}</h5>
        <p class="info__title">Рост: ${res.height} </p>
        <p class="info__title">Вес: ${res.weight} </p>
        <div class="type">
          <p class="pokemon__type ${res.types[0].type.name}">${
        res.types[0].type.name
      }</p>
          <p class="pokemon__type ${res.types[1].type.name}">${
        res.types[1].type.name
      }</p>
        </div>
        <h5 class="info__text">Базовые характеристики:</h5>
        <div class="stats">
        <div class="stats__item">
        <p class="pokemon__stats ">
            ${res.stats[0].stat.name}
          </p>
          <div class="stats__items">
            <p class="pokemon__base">${res.stats[0].base_stat}</p>
            <div class="pokemon__stats-line">
              <span style="width: ${res.stats[0].base_stat * LINE}px;"
                class="pokemon__stats-upper ${res.stats[0].stat.name}"></span>
            </div>
          </div>
          </div>

          <div class="stats">
          <div class="stats__item">
            <p class="pokemon__stats ">
              ${res.stats[1].stat.name}
            </p>
            <div class="stats__items">
              <p class="pokemon__base">${res.stats[1].base_stat}</p>
              <div class="pokemon__stats-line">
                <span style="width: ${res.stats[1].base_stat * LINE}px;"
                 class="pokemon__stats-upper ${res.stats[1].stat.name}"></span>
              </div>
            </div>
           </div>

           <div class="stats">
           <div class="stats__item">
             <p class="pokemon__stats ">
               ${res.stats[2].stat.name}
             </p>
             <div class="stats__items">
               <p class="pokemon__base">${res.stats[2].base_stat}</p>
               <div class="pokemon__stats-line">
                 <span style="width: ${res.stats[2].base_stat * LINE}px;"
                  class="pokemon__stats-upper ${res.stats[2].stat.name}"></span>
               </div>
             </div>
            </div>

            <div class="stats">
            <div class="stats__item">
              <p class="pokemon__stats ">
                ${res.stats[3].stat.name}
              </p>
              <div class="stats__items">
                <p class="pokemon__base">${res.stats[3].base_stat}</p>
                <div class="pokemon__stats-line">
                  <span style="width: ${res.stats[3].base_stat * LINE}px;"
                   class="pokemon__stats-upper ${
                     res.stats[3].stat.name
                   }"></span>
                </div>
              </div>
             </div>

             <div class="stats">
             <div class="stats__item">
               <p class="pokemon__stats ">
                 ${res.stats[4].stat.name}
               </p>
               <div class="stats__items">
                 <p class="pokemon__base">${res.stats[4].base_stat}</p>
                 <div class="pokemon__stats-line">
                   <span style="width: ${res.stats[4].base_stat * LINE}px;"
                    class="pokemon__stats-upper ${
                      res.stats[4].stat.name
                    }"></span>
                 </div>
               </div>
              </div>

              <div class="stats">
              <div class="stats__item">
                <p class="pokemon__stats ">
                  ${res.stats[5].stat.name}
                </p>
                <div class="stats__items">
                  <p class="pokemon__base">${res.stats[5].base_stat}</p>
                  <div class="pokemon__stats-line">
                    <span style="width: ${res.stats[5].base_stat * LINE}px;"
                     class="pokemon__stats-upper ${
                       res.stats[5].stat.name
                     }"></span>
                  </div>
                </div>
               </div>

      `;
    }
  });
}

// show img slider
function showArts(url) {
  getRequest(url, "", (res) => {
    console.log(res);
    if (res.sprites.other.dream_world.front_default === null) {
      $grid.innerHTML = `
    <div>
    <p class="slider__text">${res.name}</p>
    <div class="slider">
       <div class="slider__item">
        <img class="slider-item-img" src="${res.sprites.front_default}" alt="#" />
      </div>
      <div class="slider__item">
        <img class="slider-item-img" src="${res.sprites.front_shiny}" alt="#" />
      </div>
      <div class="slider__item">
        <img class="slider-item-img" src="${res.sprites.back_default}" alt="#" />
      </div>
    </div>
    </div>
    `;
    } else {
      $grid.innerHTML = `
  <div>
  <p class="slider__text">${res.name}</p>
  <div class="slider">
  <div class="slider__item">
      <img class="slider-item-img" src="${res.sprites.other.dream_world.front_default}" alt="#" />
    </div>
    <div class="slider__item">
      <img class="slider-item-img" src="${res.sprites.front_default}" alt="#" />
    </div>
    <div class="slider__item">
      <img class="slider-item-img" src="${res.sprites.front_shiny}" alt="#" />
    </div>
    <div class="slider__item">
      <img class="slider-item-img" src="${res.sprites.back_default}" alt="#" />
    </div>
    
  </div>
  </div>
    `;
    }
    $(function () {
      $(".slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      });
    });
  });
}

//back to head
$head.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    $pagination.style.display = "flex";
    $grid.style.display = "grid";
    $grid.style.justifyContent = "space-between";

    getRequest(
      `${baseUrl}/pokemon`,
      `offset=${offsetCounter}&limit=${LIMIT}`,
      (res) => {
        const results = res.results;
        const card = results.map((item) => cardTemplate(item)).join("");

        $grid.innerHTML = card;
        $searchInput.value = "";
      }
    );
  });
});

// PAGINATION
window.addEventListener("load", () => {
  $prevBtn.setAttribute("disabled", true);
  if (true) {
    $prevBtn.classList.add("disabledBtn");
  }
});

$nextBtn.addEventListener("click", (e) => {
  e.preventDefault();

  $prevBtn.removeAttribute("disabled");
  if (true) {
    $prevBtn.classList.remove("disabledBtn");
  }

  if (pageCounter >= 1 && pageCounter <= TOTAL_PAGES) {
    if (pageCounter === TOTAL_PAGES) {
      $nextBtn.setAttribute("disabled", true);
      $nextBtn.classList.add("disabledBtn");

      getRequest(
        `${baseUrl}/pokemon`,
        `offset=${(offsetCounter += LIMIT)}&limit=${LIMIT}`,
        (res) => {
          pageCounter++;
          $page.innerHTML = pageCounter;

          const temp = res.results.map((item) => cardTemplate(item)).join("");
          $grid.innerHTML = temp;
        }
      );
    } else {
      getRequest(
        `${baseUrl}/pokemon`,
        `offset=${(offsetCounter += LIMIT)}&limit=${LIMIT}`,
        (res) => {
          pageCounter++;
          $page.innerHTML = pageCounter;

          const temp = res.results.map((item) => cardTemplate(item)).join("");
          $grid.innerHTML = temp;
        }
      );
    }
  }
});

$prevBtn.addEventListener("click", (e) => {
  if (pageCounter >= 1) {
    pageCounter--;
    if (pageCounter === 1) {
      $prevBtn.setAttribute("disabled", true);
      $prevBtn.classList.add("disabledBtn");
      offsetCounter = 0;
      getRequest(
        `${baseUrl}/pokemon`,
        `offset=${offsetCounter}&limit= ${LIMIT}`,
        (res) => {
          $page.innerHTML = pageCounter;

          const temp = res.results.map((item) => cardTemplate(item)).join("");
          $grid.innerHTML = temp;
        }
      );
    } else {
      getRequest(
        `${baseUrl}/pokemon`,
        `offset=${(offsetCounter -= LIMIT)}&limit=${LIMIT}`,
        (res) => {
          $nextBtn.removeAttribute("disabled");
          $nextBtn.classList.remove("disabledBtn");
          $page.innerHTML = pageCounter;
          const temp = res.results.map((item) => cardTemplate(item)).join("");
          $grid.innerHTML = temp;
        }
      );
    }
  }
});

// SEARCH
$searchInput.addEventListener("input", (e) => {
  let inputValue = e.target.value;

  if (inputValue.replace(/\s/g, "") === "") {
    getRequest(
      `${baseUrl}/pokemon`,
      `offset=${offsetCounter}&limit=${LIMIT}`,
      (res) => {
        const temp = res.results.map((item) => cardTemplate(item)).join("");
        $grid.innerHTML = temp;
      }
    );
  } else {
    getRequest(
      `${baseUrl}/pokemon`,
      `offset=0&limit=${TOTAL_POKEMONS}`,
      (res) => {
        const pokemonName = res.results;

        const filteredArr = pokemonName.filter(({ name }) =>
          name.includes(inputValue.trim().toLowerCase())
        );

        const temp = filteredArr.map((item) => cardTemplate(item)).join("");
        $grid.innerHTML = temp;
      }
    );
  }
});

$searchCancelBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if ($searchInput.value === "") {
    alert("Вы ничего не ввели!");
  }

  $searchInput.value = "";
  getRequest(
    `${baseUrl}/pokemon`,
    `offset=${offsetCounter}&limit=${LIMIT}`,
    (res) => {
      const temp = res.results.map((item) => cardTemplate(item)).join("");
      $grid.innerHTML = temp;
    }
  );
});


