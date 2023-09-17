document.addEventListener("DOMContentLoaded", function () {
  const selectYear = document.getElementById("select-year");
  const prelevementsTable = document.getElementById("samples-table");

  // Remplir le menu déroulant avec les années uniques disponibles
  fetch("/expedition-med/admin/uniqueYears")
    .then((response) => response.json())
    .then((years) => {
      years.forEach((year) => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        selectYear.appendChild(option);
      });
    })
    .catch((error) => console.error(error));

  // Écoutez le changement dans le menu déroulant et effectuez la requête AJAX
  selectYear.addEventListener("change", function () {
    const selectedYear = selectYear.value;

    // Effectuer la requête AJAX pour récupérer les prélevements par année
    fetch(`/expedition-med/admin/samplesByYear/${selectedYear}`)
      .then((response) => response.json())
      .then((prelevements) => {
        prelevementsTable.innerHTML = ""; // Réinitialiser le contenu de la table
        console.log(prelevements);
        // Boucle à travers les prélevements et ajoutez-les à la table
        prelevements.forEach((prelevement) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                           <td>${prelevement.Sample}</td>
                           <td>${prelevement.Sea}</td>
                           <td>${prelevement.Date}</td>
                           <td><a href="admin/triBySample/${prelevement.Sample}"><i class="fa-solid fa-filter" style="color: #ff00ff;"></i></a></td>
                           <td><a href="admin/viewBySample/${prelevement.Sample}"<i class="fa-regular fa-eye" style="color: #ffff00;"></i></a></td>
                           <td><a href="admin/editBySample/${prelevement.Sample}"><i class="fa-regular fa-pen-to-square" style="color: #ff8000;"></i></a></td>
                           <td><a href="admin/deleteBySample/${prelevement.Sample}" onclick="return confirm('Confirmer la suppression de ce prélèvement');"><i class="fa-regular fa-trash-can" style="color:red;"></i></a></td>
                       `;
          prelevementsTable.appendChild(row);
        });
      })
      .catch((error) => console.error(error));
  });
});
// Votre code AJAX pour récupérer les prélevements en fonction de l'année sélectionnée
