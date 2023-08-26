import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Home {
  constructor() {
    this.getData("mmorpg");

    document.querySelectorAll("nav .nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.activeEvent(link);
        const category = link.getAttribute("data-category");
        this.getData(category);
      });
    });

    this.loading = document.querySelector(".loading");
    this.details = document.getElementById("details");
    this.games = document.getElementById("games");

    this.ui = new Ui();
    this.loading.classList.remove("d-none");
  }

  activeEvent(link) {
    document.querySelector("nav .active").classList.remove("active");
    link.classList.add("active");
  }

  async getData(category) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "22e5f4b675msh881f39c1e1af7e3p142007jsn114769ed6fde",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      this.ui.displayGames(data);
    } catch (error) {
      console.error(error);
    }

    this.loading.classList.add("d-none");
    this.startEvent();
  }
  startEvent() {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        this.details.classList.remove("d-none");
        this.games.classList.add("d-none");

        new Details(card.dataset.id);
      });
    });
  }
}
