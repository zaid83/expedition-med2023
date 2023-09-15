// Fonction pour effectuer un appel fetch et obtenir des données JSON
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur lors de la requête : ${response.statusText}`);
  }
  return await response.json();
}
// Fonction pour créer un élément select et ses options
function createSelectElementSample(name, options) {
  const selectEl = document.createElement("select");
  selectEl.name = name;
  selectEl.classList.add("form-select");
  console.log(options);
  options.forEach((optionData) => {
    const optionEl = document.createElement("option");
    optionEl.value = optionData.Sample;
    optionEl.innerText = optionData.Sample;
    selectEl.appendChild(optionEl);
  });

  return selectEl;
}

// Fonction pour créer un élément select et ses options
function createSelectElementType(name, options) {
  const selectEl = document.createElement("select");
  selectEl.name = name;
  selectEl.classList.add("form-select");
  console.log(options);
  options.forEach((optionData) => {
    const optionEl = document.createElement("option");
    optionEl.value = optionData.id_type;
    optionEl.innerText = optionData.name;
    selectEl.appendChild(optionEl);
  });

  return selectEl;
}
function createSelectElementColor(name, options) {
  const selectEl = document.createElement("select");
  selectEl.name = name;
  selectEl.classList.add("form-select");
  console.log(options);
  options.forEach((optionData) => {
    const optionEl = document.createElement("option");
    optionEl.value = optionData.id_color;
    optionEl.innerText = optionData.name;
    selectEl.appendChild(optionEl);
  });

  return selectEl;
}

function createSelectElementSize(name, options) {
  const selectEl = document.createElement("select");
  selectEl.name = name;
  selectEl.classList.add("form-select");
  console.log(options);
  options.forEach((optionData) => {
    const optionEl = document.createElement("option");
    optionEl.value = optionData.id_size;
    optionEl.innerText = optionData.name;
    selectEl.appendChild(optionEl);
  });

  return selectEl;
}

// Fonction pour créer un label
function createLabel(text, forAttribute) {
  const labelEl = document.createElement("label");
  labelEl.textContent = text;
  labelEl.setAttribute("for", forAttribute);
  labelEl.classList.add("form-label");
  return labelEl;
}

// Fonction pour créer un input de type nombre
function createNumberInput(name, id) {
  const numberInput = document.createElement("input");
  numberInput.type = "number";
  numberInput.name = name;
  numberInput.setAttribute("id", id);
  numberInput.classList.add("form-control");
  numberInput.required = true;
  return numberInput;
}

// Fonction pour organiser le code principal
async function main() {
  try {
    // Fetch des données pour le select des échantillons
    const sampleData = await fetchData("Data/selectSampleJson");
    console.log(sampleData);
    const ligneTriEl = document.querySelector(".mb-3");
    const selectSampleEl = createSelectElementSample("sample_1", sampleData);

    // Fetch des données pour le select des types de tri
    const typeData = await fetchData("Data/selectTypeTriJson");
    const typeLabel = createLabel("Type : ", "type-input");
    const selectTypeEl = createSelectElementType("type_1", typeData);
    selectTypeEl.setAttribute("id", "type-input");

    // Fetch des données pour le select des tailles de tri
    const sizeData = await fetchData("Data/selectSizeTriJson");
    const selectSizeEl = createSelectElementSize("size_1", sizeData);
    selectSizeEl.setAttribute("id", "size-input");
    const sizeLabel = createLabel("Taille : ", "size-input");

    // Fetch des données pour le select des couleurs de tri
    const colorData = await fetchData("Data/selectColorTriJson");
    const selectColorEl = createSelectElementColor("color_1", colorData);
    selectColorEl.setAttribute("id", "color-input");
    const colorLabel = createLabel("Color : ", "color-input");

    // Création de l'input de type nombre pour "Number"
    const numberInput = createNumberInput("number_1", "number-input");
    const numberLabel = createLabel("Number : ", "number-input");

    // Ajout des éléments au formulaire
    ligneTriEl.appendChild(selectSampleEl);
    ligneTriEl.appendChild(sizeLabel);
    ligneTriEl.appendChild(selectSizeEl);
    ligneTriEl.appendChild(typeLabel);
    ligneTriEl.appendChild(selectTypeEl);
    ligneTriEl.appendChild(colorLabel);
    ligneTriEl.appendChild(selectColorEl);
    ligneTriEl.appendChild(numberLabel);
    ligneTriEl.appendChild(numberInput);

    let indexligne = 2;

    const ajoutBtn = document.querySelector(".ajout_ligne");

    ajoutBtn.addEventListener("click", async () => {
      // Ajoutez async ici
      const ligneTri = document.createElement("div");
      ligneTri.classList.add("mb-3");

      try {
        const sampleData = await fetchData("Data/selectSampleJson");
        const selectSampleEl = createSelectElementSample(
          `sample_${indexligne}`,
          sampleData
        );

        const typeData = await fetchData("Data/selectTypeTriJson");
        const typeLabel = createLabel("Type : ", `type-input-${indexligne}`);
        const selectTypeEl = createSelectElementType(
          `type_${indexligne}`,
          typeData
        );
        selectTypeEl.setAttribute("id", `type-input-${indexligne}`);

        const sizeData = await fetchData("Data/selectSizeTriJson");
        const selectSizeEl = createSelectElementSize(
          `size_${indexligne}`,
          sizeData
        );
        selectSizeEl.setAttribute("id", `size-input-${indexligne}`);
        const sizeLabel = createLabel("Taille : ", `size-input-${indexligne}`);

        const colorData = await fetchData("Data/selectColorTriJson");
        const selectColorEl = createSelectElementColor(
          `color_${indexligne}`,
          colorData
        );
        selectColorEl.setAttribute("id", `color-input-${indexligne}`);
        const colorLabel = createLabel("Color : ", `color-input-${indexligne}`);

        const numberInput = createNumberInput(
          `number_${indexligne}`,
          `number-input-${indexligne}`
        );
        const numberLabel = createLabel(
          "Number : ",
          `number-input-${indexligne}`
        );

        ligneTri.appendChild(selectSampleEl);
        ligneTri.appendChild(sizeLabel);
        ligneTri.appendChild(selectSizeEl);
        ligneTri.appendChild(typeLabel);
        ligneTri.appendChild(selectTypeEl);
        ligneTri.appendChild(colorLabel);
        ligneTri.appendChild(selectColorEl);
        ligneTri.appendChild(numberLabel);
        ligneTri.appendChild(numberInput);

        const formulaire = document.querySelector("form");
        formulaire.insertBefore(ligneTri, ajoutBtn);
      } catch (error) {
        console.error(`Une erreur s'est produite : ${error.message}`);
      }

      indexligne++;
    });
  } catch (error) {
    console.error(`Une erreur s'est produite : ${error.message}`);
  }
}

// Appel de la fonction principale
main();
