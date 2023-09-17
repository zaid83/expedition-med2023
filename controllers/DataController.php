<?php

namespace controllers;

use models\DataRepository;
use models\UsersRepository;
use PhpOffice\PhpSpreadsheet\IOFactory;

class DataController
{
  private $data;
  private $user;

  public function __construct()
  {
    $this->data = new DataRepository();
    $this->user = new UsersRepository();
  }

  // Actions liées aux échantillons (Sampling)

  public function sampling()
  {
    // Vérifie la connexion de l'utilisateur
    $this->user->checkConnexion($_SESSION["id"]);

    // Récupère les mers
    $seas = $this->data->findAllSeas();

    $pageTitle = "Sampling";
    $page = "views/AddSampling.phtml";
    require_once "views/Layout.phtml";
  }

  // Actions liées aux tris (Tri)

  public function tri()
  {
    // Vérifie la connexion de l'utilisateur
    $this->user->checkConnexion($_SESSION["id"]);
    $pageTitle = "Expedition Med";
    $page = "views/AddTri.phtml";
    require_once "views/Layout.phtml";
  }

  // Actions de récupération de données au format JSON

  public function data()
  {
    $result = $this->data->findAll();
    echo json_encode($result);
  }

  public function allSeasJson()
  {
    $result = $this->data->findAllSeas();
    echo json_encode($result);
  }

  public function selectSampleJson()
  {
    $this->user->checkConnexion($_SESSION["id"]);
    $result = $this->data->findAllSample();
    echo json_encode($result);
  }

  public function selectTypeTriJson()
  {
    $this->user->checkConnexion($_SESSION["id"]);
    $result = $this->data->findAllType();
    echo json_encode($result);
  }

  public function selectSizeTriJson()
  {
    $this->user->checkConnexion($_SESSION["id"]);
    $result = $this->data->findAllSize();
    echo json_encode($result);
  }

  public function selectColorTriJson()
  {
    $this->user->checkConnexion($_SESSION["id"]);
    $result = $this->data->findAllColor();
    echo json_encode($result);
  }

  // Actions de traitement de données (POST)

  public function triPost()
  {
    $this->user->checkConnexion($_SESSION["id"]);
    $tableau = $this->data->tableTri($_POST);
    var_dump($tableau);
    foreach ($tableau as $tableau2) {
      $this->data->addTri($tableau2["sample"], $tableau2["size"], $tableau2["type"], $tableau2["color"], $tableau2["number"]);
      var_dump($tableau2);
    }
    return header('Location: /expedition-med/Users/index');
  }

  // Autres actions

  public function plastiqueSum()
  {
    $result = $this->data->numberBySample();
    echo json_encode($result);
  }

  public function PushPrelevement()
  {
    $this->data->formulairePrelevement();
    return header('Location: /expedition-med/Data/tri');
  }

  public function detailBySample($id)
  {
    $resultT = $this->data->findTypeBySample($id);
    $resultC = $this->data->findColorBySample($id);
    $resultS = $this->data->findSizeBySample($id);
    $details = $this->data->findDetailBySample($id);
    $pageTitle = "Expedition Med";
    $page = "views/DetailBySample.phtml";
    require_once "views/Layout.phtml";
  }

  public function detailBySeas($id)
  {
    $resultT = $this->data->findTypeBySea($id);
    $resultC = $this->data->findColorBySea($id);
    $resultS = $this->data->findSizeBySea($id);
    $details = $this->data->findDetailBySea($id);
    $pageTitle = "Expedition Med";
    $page = "views/DetailBySeas.phtml";
    require_once "views/Layout.phtml";
  }
  public function detailBySampleJson($id)
  {
    $resultT = $this->data->findTypeBySample($id);
    $resultC = $this->data->findColorBySample($id);
    $resultS = $this->data->findSizeBySample($id);
    $details = $this->data->findDetailBySample($id);

    // Regroupez les tableaux dans un tableau associatif
    $data = [
      "types" => $resultT,
      "colors" => $resultC,
      "sizes" => $resultS,
      "details" => $details
    ];

    // Convertissez le tableau associatif en JSON
    $jsonResponse = json_encode($data);

    // Définissez l'en-tête HTTP pour indiquer que la réponse est JSON
    header('Content-Type: application/json');

    // Envoyez la réponse JSON au frontend
    echo $jsonResponse;
  }


  public function detailBySeasJson($id)
  {
    $resultT = $this->data->findTypeBySea($id);
    $resultC = $this->data->findColorBySea($id);
    $resultS = $this->data->findSizeBySea($id);
    $details = $this->data->findDetailBySea($id);

    // Regroupez les tableaux dans un tableau associatif
    $data = [
      "types" => $resultT,
      "colors" => $resultC,
      "sizes" => $resultS,
      "details" => $details
    ];

    // Convertissez le tableau associatif en JSON
    $jsonResponse = json_encode($data);

    // Définissez l'en-tête HTTP pour indiquer que la réponse est JSON
    header('Content-Type: application/json');

    // Envoyez la réponse JSON au frontend
    echo $jsonResponse;
  }


  // Actions d'importation de données

  public function import()
  {
    if (isset($_POST["Import"])) {
      $csvImporter = new \models\DataRepository();
      $filename = $_FILES["file"]["tmp_name"];
      $data = $csvImporter->importCSV($filename); // les données du fichier Excel

      foreach ($data as $row) {
        $csvImporter->insertData($row); // Appel de la méthode insertData
      }
      return header('Location: /expedition-med/Users/index');
      $page = "views/AdminIndex.phtml";
      require_once "views/Layout.phtml";
    }
  }

  public function importSampling()
  {
    if (isset($_POST["Import"])) {
      $csvImporter = new \models\DataRepository();
      $filename = $_FILES["file"]["tmp_name"];
      $data = $csvImporter->importCSVSampling($filename); // les données du fichier Excel

      foreach ($data as $row) {
        $csvImporter->insertDataPrelevement($row); // Appel de la méthode insertData
      }
      return header('Location: /expedition-med/Users/index');
      $page = "views/AdminIndex.phtml";
      require_once "views/Layout.phtml";
    }
  }
}
