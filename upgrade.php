<?php

use Illuminate\Support\Facades\Artisan;

function beforeUpdate(): bool
{
    Artisan::call('backup::db');
    return true;
}


function afterUpdate(): bool
{
    Artisan::call('migrate --force');
    return true;
}

?>
