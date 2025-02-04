<?php

use DataService;

class App
{
    public $loading = false;
    private $output = ""; // Holds any text output to display on the page
    public readonly array $dataSheetModels;
    public readonly array $dataSheetWarGear;

    public function __construct()
    {
        $this->initApp();
    }

    private function initApp()
    {
        try {
            $this->loading = true;
            if (empty($this->data)) {
                $dataService = new DataService();
                if ($dataService->loadAll(true)) {
                    $this->dataSheetModels = $dataService->getDataSheetModels();
                    $this->dataSheetWarGear = $dataService->getDataSheetWarGear();
                }
            }
        } catch (\Throwable $th) {
            //throw $th;
        } finally {
            $this->loading = false;
        }
    }

    public function calculateData()
    {
        if (empty($this->data)) {
            $this->output = "No data available to calculate. Please load data first.";
            return;
        }

        $calculator = new CalculationService();
        // $results = $calculator->process($this->data, 2);
        // $this->output = "Data calculated successfully:\n" . print_r($results, true);
    }

    public function exportData()
    {
        if (empty($this->data)) {
            $this->output = "No data available to export. Please load data first.";
            return;
        }

        $exporter = new ExportService();
        // $exporter->export($this->data);
        // $this->output = "Data exported successfully. Check the output file.";
    }

    public function renderOutput()
    {
        echo $this->output;
    }
}
