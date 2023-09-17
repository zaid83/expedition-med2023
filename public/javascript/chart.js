// Obtenir l'URL actuelle
var url = window.location.href;
// Divisez l'URL en morceaux en utilisant le caractère "/"
var segments = url.split("/");

// Le dernier segment (après le dernier "/") sera le dernier paramètre
var sample = segments[segments.length - 1];

fetch(`data/detailBySampleJson/${sample}`)
  .then((response) => response.json())
  .then((datas) => {
    const typenames = datas.types.map((type) => type.typename); // Récupérer les types depuis la réponse fetch
    console.log(typenames);

    const typeSum = datas.types.map((type) => type.total); // Récupérer les types depuis la réponse fetch
    console.log(typeSum);

    const data = {
      labels: typenames, // Utiliser les types pour les libellés du graphique
      datasets: [
        {
          data: typeSum, // Remplacez ces valeurs par les données réelles
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "right",
      },
      plugins: {
        title: {
          display: true,
          text: "Tri par type",
          font: {
            size: 36,
          }, // Taille de la police du titre
        },
      },
    };

    // Création du graphique
    const ctx = document.getElementById("pie-type-sample").getContext("2d");
    const camembertChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options,
    });
  });

fetch(`data/detailBySampleJson/${sample}`)
  .then((response) => response.json())
  .then((datas) => {
    const colornames = datas.colors.map((color) => color.colorname);

    const colorSum = datas.colors.map((color) => color.total); // Récupérer les colors depuis la réponse fetch

    const customColors = [
      "rgba(0, 0, 0)", // Noir
      "rgba(0, 0, 255, 0.5)", // Bleu
      "rgba(0, 128, 0, 0.5)", // Vert
      "rgba(255, 255, 255, 0.5)", // Blanc
      "rgba(255, 165, 0, 0.5)", // Orange
      "rgba(0, 10, 0, 0.3)", // Transparent
      "rgba(255, 255, 0, 0.5)", // Jaune
      "rgba(255, 0, 255, 0.5)", // Multicolore
    ];

    const data = {
      labels: colornames, // Utiliser les colors pour les libellés du graphique
      datasets: [
        {
          data: colorSum, // Remplacez ces valeurs par les données réelles
          backgroundColor: customColors,
          borderColor: [
            customColors.map((color) => color.replace(", 0.5)", ", 1)")),
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "right",
      },
      plugins: {
        title: {
          display: true,
          text: "Tri par couleur",
          font: {
            size: 36,
          }, // Taille de la police du titre
        },
      },
    };

    // Création du graphique
    const ctx = document.getElementById("pie-color-sample").getContext("2d");
    const camembertChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options,
    });
  });

fetch(`data/detailBySampleJson/${sample}`)
  .then((response) => response.json())
  .then((datas) => {
    const sizenames = datas.sizes.map((size) => size.sizename);

    const sizeSum = datas.sizes.map((size) => size.total); // Récupérer les sizes depuis la réponse fetch

    const customColors = [
      "rgba(0, 128, 0, 0.5)", // Vert
      "rgba(255, 165, 0, 0.5)", // Orange
      "rgba(255, 255, 0, 0.5)", // Jaune
      "rgba(255, 0, 255, 0.5)", // Multicolore
    ];

    const data = {
      labels: sizenames, // Utiliser les colors pour les libellés du graphique
      datasets: [
        {
          data: sizeSum, // Remplacez ces valeurs par les données réelles
          backgroundColor: customColors,
          borderColor: [
            customColors.map((color) => color.replace(", 0.5)", ", 1)")),
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Tri par taille",
          position: "top",
          font: {
            size: 36,
          }, // Taille de la police du titre
        },
      },
    };

    // Création du graphique
    const ctx = document.getElementById("pie-size-sample").getContext("2d");
    const camembertChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options,
    });
  });

fetch(`data/detailBySeasJson/${sample}`)
  .then((response) => response.json())
  .then((datas) => {
    const sizenames = datas.sizes.map((size) => size.sizename);

    const sizeSum = datas.sizes.map((size) => size.total); // Récupérer les sizes depuis la réponse fetch

    const customColors = [
      "rgba(0, 128, 0, 0.5)", // Vert
      "rgba(255, 165, 0, 0.5)", // Orange
      "rgba(255, 255, 0, 0.5)", // Jaune
      "rgba(255, 0, 255, 0.5)", // Multicolore
    ];

    const data = {
      labels: sizenames, // Utiliser les colors pour les libellés du graphique
      datasets: [
        {
          data: sizeSum, // Remplacez ces valeurs par les données réelles
          backgroundColor: customColors,
          borderColor: [
            customColors.map((color) => color.replace(", 0.5)", ", 1)")),
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Tri par taille",
          position: "top",
          font: {
            size: 36,
          }, // Taille de la police du titre
        },
      },
    };

    // Création du graphique
    const ctx = document.getElementById("pie-size-sea").getContext("2d");
    const camembertChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options,
    });
  });
fetch(`data/detailBySeasJson/${sample}`)
  .then((response) => response.json())
  .then((datas) => {
    const typenames = datas.types.map((type) => type.typename); // Récupérer les types depuis la réponse fetch
    console.log(typenames);

    const typeSum = datas.types.map((type) => type.total); // Récupérer les types depuis la réponse fetch
    console.log(typeSum);

    const data = {
      labels: typenames, // Utiliser les types pour les libellés du graphique
      datasets: [
        {
          data: typeSum, // Remplacez ces valeurs par les données réelles
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "right",
      },
      plugins: {
        title: {
          display: true,
          text: "Tri par type",
          font: {
            size: 36,
          }, // Taille de la police du titre
        },
      },
    };

    // Création du graphique
    const ctx = document.getElementById("pie-type-sea").getContext("2d");
    const camembertChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options,
    });
  });

fetch(`data/detailBySeasJson/${sample}`)
  .then((response) => response.json())
  .then((datas) => {
    const colornames = datas.colors.map((color) => color.colorname);

    const colorSum = datas.colors.map((color) => color.total); // Récupérer les colors depuis la réponse fetch

    const customColors = [
      "rgba(0, 0, 0)", // Noir
      "rgba(0, 0, 255, 0.5)", // Bleu
      "rgba(0, 128, 0, 0.5)", // Vert
      "rgba(255, 255, 255, 0.5)", // Blanc
      "rgba(255, 165, 0, 0.5)", // Orange
      "rgba(0, 10, 0, 0.3)", // Transparent
      "rgba(192, 192, 192, 0.5)", // Gris clair
      "rgba(255, 255, 0, 0.5)", // Jaune
      "rgba(255, 0, 255, 0.5)", // Multicolore
      "rgba(139, 69, 19, 0.5)", // Marron
      "rgba(47, 79, 79, 0.5)", // Gris foncé
      "rgba(255, 0, 0, 0.5)", // Rouge
    ];

    const data = {
      labels: colornames, // Utiliser les colors pour les libellés du graphique
      datasets: [
        {
          data: colorSum, // Remplacez ces valeurs par les données réelles
          backgroundColor: customColors,
          borderColor: [
            customColors.map((color) => color.replace(", 0.5)", ", 1)")),
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "right",
      },
      plugins: {
        title: {
          display: true,
          text: "Tri par couleur",
          font: {
            size: 36,
          }, // Taille de la police du titre
        },
      },
    };

    // Création du graphique
    const ctx = document.getElementById("pie-color-sea").getContext("2d");
    const camembertChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options,
    });
  });
