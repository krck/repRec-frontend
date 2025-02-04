<!-- 
    PHP Playground - served with: 
    > php -S localhost:8000 
    (in the PHP directory)
-->

<?php
session_start(); // Start the session

require_once 'logic/CalculationService.php';
require_once 'logic/ExportService.php';
require_once 'logic/DataService.php';

require_once 'model/WhDataSheet.php';
require_once 'model/WhDataSheetModel.php';
require_once 'model/WhDataSheetWarGear.php';

// Full Error/Debugging output
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class App
{
    public $loading = false;
    private $data = []; // Holds the loaded or processed data
    private $output = ""; // Holds any text output to display on the page

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
                $dataService->loadAll(true);
                $this->data = ["not empty"];
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

// Retrieve the App instance from the session (or create a new one)
if (!isset($_SESSION['app'])) {
    $_SESSION['app'] = new App();
}
$app = $_SESSION['app']; // Restore the app object

// When pressing a button, the form 
// (Code here runs only when the page is accessed via an HTTP POST request)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? ''; // Get the button's action value
    switch ($action) {
        case 'calculate':
            $app->calculateData();
            break;
        case 'export':
            $app->exportData();
            break;
        default:
            echo "No valid action selected.";
    }

    // Save the updated App instance back to the session
    $_SESSION['app'] = $app;
}

// if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action'] === 'load') {
//     $app->loadData();

//     // Save the updated App instance back to the session
//     $_SESSION['app'] = $app;
// }

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Warhammer Calculator</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="public/style.css">
    <style>
        .loader {
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            width: 120px;
            height: 120px;
            -webkit-animation: spin 2s linear infinite;
            /* Safari */
            animation: spin 2s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</head>

<body>
    <h1>Warhammer Calculator</h1>

    <div>
        <div class="loader" style="<?php echo ($app->loading == true ? "display:block !important;" : "display:none !important;") ?>"></div>

        <div>
            <h2>Output:</h2>
            <pre><?php $app->renderOutput(); ?></pre>
        </div>
    </div>

    <!-- <form method="get" action="index.php">
        <button type="submit" name="action" value="load">Load Data</button>
    </form>
    <form method="post" action="index.php">
        <button type="submit" name="action" value="calculate">Calculate</button>
        <button type="submit" name="action" value="export">Export</button>
    </form> -->

</body>

</html>