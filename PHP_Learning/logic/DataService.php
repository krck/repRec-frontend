<?php

class DataService
{
    const CSV_FIRST_ROW = 1;
    const CSV_SEPARATOR = "|";

    public function __construct() {}

    public function loadAll($reload)
    {
        if ($reload === true) {
            // Parse the raw data from the Wahapedia csv files
            $dataSheetsRaw = $this->parseCSV("http://wahapedia.ru/wh40k10ed/Datasheets.csv");
            $dataSheetModelsRaw = $this->parseCSV("http://wahapedia.ru/wh40k10ed/Datasheets_models.csv");
            $dataSheetWarGearRaw = $this->parseCSV("http://wahapedia.ru/wh40k10ed/Datasheets_wargear.csv");

            // Convert the raw data into typed object arrays
            $dataSheetObjectsMap = [];
            foreach ($dataSheetsRaw as $value) {
                $tmp = new WhDataSheet($value);
                $dataSheetObjectsMap[$tmp->id] = $tmp;
            }

            $anotherTest = $dataSheetObjectsMap[882];

            $dataSheetModelObjects = array_map(function ($data) {
                return new WhDataSheetModel($data);
            }, $dataSheetModelsRaw);

            $dataSheetWarGearObjects = array_map(function ($data) {
                return new WhDataSheetWarGear($data);
            }, $dataSheetWarGearRaw);
        }

        $test = 1;
    }

    #region public readonly string

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
