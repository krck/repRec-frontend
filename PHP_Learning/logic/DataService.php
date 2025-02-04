<?php

class DataService
{
    const CSV_FIRST_ROW = 1;
    const CSV_SEPARATOR = "|";

    private array $dataSheetModelArr = [];
    private array $dataSheetWarGearArr = [];

    public function __construct() {}

    #region PUBLIC FUNCTIONS

    public function getDataSheetModels(): array
    {
        return $this->dataSheetModelArr;
    }

    public function getDataSheetWarGear(): array
    {
        return $this->dataSheetWarGearArr;
    }

    public function loadAll($reload): bool
    {
        try {
            if ($reload === true) {
                // Parse the raw data from the Wahapedia csv files
                $dataSheetsRaw = $this->parseCSV("http://wahapedia.ru/wh40k10ed/Datasheets.csv");
                $dataSheetModelsRaw = $this->parseCSV("http://wahapedia.ru/wh40k10ed/Datasheets_models.csv");
                $dataSheetWarGearRaw = $this->parseCSV("http://wahapedia.ru/wh40k10ed/Datasheets_wargear.csv");

                // Convert the raw DataSheets into a id/value dictionary
                $dataSheetsMap = [];
                foreach ($dataSheetsRaw as $value) {
                    $tmp = new WhDataSheet($value);
                    $dataSheetsMap[$tmp->id] = $tmp;
                }

                $this->dataSheetModelArr = [];
                foreach ($dataSheetModelsRaw as $dsm) {
                    // Generate a full DataSheet name with additional info and create the DataSheetModel
                    $fullName = "";
                    $rawId = intval($dsm[0]);
                    if (isset($dataSheetsMap[$rawId])) {
                        $dataSheet = $dataSheetsMap[$rawId];
                        $fullName = "{$dataSheet->name} [{$dataSheet->factionId} - {$dataSheet->role}]";
                    }
                    array_push($this->dataSheetModelArr, new WhDataSheetModel($dsm, $fullName));
                }

                $this->dataSheetWarGearArr = [];
                foreach ($dataSheetWarGearRaw as $dwg) {
                    // Generate a full DataSheet name with additional info and create the DataSheetModel
                    $fullName = "";
                    $rawId = intval($dsm[0]);
                    if (isset($dataSheetsMap[$rawId])) {
                        $dataSheet = $dataSheetsMap[$rawId];
                        $fullName = "{$dataSheet->name} [{$dataSheet->factionId} - {$dataSheet->role}]";
                    }
                    array_push($this->dataSheetWarGearArr, new WhDataSheetWarGear($dwg, $fullName));
                }
            }
            return true;
        } catch (\Throwable $th) {
            // "\" forces PHP to look for the class in the global namespace
            // (this save a "use Throwable" declaration on top of the file)
            return false;
        }
    }

    #endregion

    #region PRIVATE FUNCTIONS

    private function parseCSV($fileLink)
    {
        $result = [];
        try {
            $fileContentStr = file_get_contents($fileLink);
            if ($fileContentStr != false) {
                $fileContent = explode("\n", $fileContentStr);
                for ($rowIdx = self::CSV_FIRST_ROW; $rowIdx < count($fileContent); $rowIdx++) {
                    $rowContent = explode(self::CSV_SEPARATOR, $fileContent[$rowIdx]);
                    $result[$rowIdx - 1] = $rowContent;
                }
            }
            return $result;
        } catch (\Throwable $th) {
            throw new Error("Error parsing CSV: " + $fileLink, 0, $th);
        }
    }

    #endregion 
}
