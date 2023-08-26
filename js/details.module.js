import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {
    document.getElementById("btnClose").addEventListener("click", () => {
      document.getElementById("details").classList.add("d-none");
      document.getElementById("games").classList.remove("d-none");
    });
    this.getDetails(id);
  }
  async getDetails(id) {
    document.querySelector(".loading").classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "22e5f4b675msh881f39c1e1af7e3p142007jsn114769ed6fde",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      new Ui().displayDetails(result);
    } catch (error) {
      console.error(error);
    }
    document.querySelector(".loading").classList.add("d-none");
  }
}
