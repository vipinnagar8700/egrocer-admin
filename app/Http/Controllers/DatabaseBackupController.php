<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class DatabaseBackupController extends Controller
{
    public function download_db_backup(Request $request) 
    {
        $db_host= env('DB_HOST');
        $db_name = env('DB_DATABASE');
        $db_user = env('DB_USERNAME');
        $db_password = env('DB_PASSWORD');
        $today = now()->format('Y-m-d_H-i-s');
        
        $filePath = storage_path("{$db_name}-{$today}.sql");
        $command = "mysqldump --quick --opt --skip-extended-insert --complete-insert --host=".$db_host." --user=".$db_user." --password='".$db_password."' ".$db_name." > {$filePath}";
        exec($command, $output, $exitCode);
        return response()->download($filePath)->deleteFileAfterSend(true);
      
    }
}


