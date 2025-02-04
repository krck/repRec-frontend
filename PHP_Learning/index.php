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
require_once 'logic/App.php';

require_once 'model/WhDataSheet.php';
require_once 'model/WhDataSheetModel.php';
require_once 'model/WhDataSheetWarGear.php';

// Full Error/Debugging output
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
            <p><?php $app->renderOutput(); ?></p>
            <p><?php count($app->$dataSheetModels) ?></p>
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