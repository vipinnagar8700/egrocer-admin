<?php


namespace App\Http\Controllers;


use App\Helpers\CommonHelper;
use App\Helpers\PermissionsChecker;
use App\Helpers\RequirementsChecker;
use App\Http\Controllers\API\StoreSettingsApiController;
use Brotzka\DotenvEditor\DotenvEditor;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use DB;

use Exception;

use Composer\Factory;
use Composer\IO\NullIO;
use Composer\Json\JsonFile;
use Composer\Package\PackageInterface;
use Composer\Semver\Comparator;
use Composer\Semver\Semver;

use Composer\Util\HttpDownloader;

class InstallController
{
    protected $requirements;
    protected $permissions;
    public function __construct(RequirementsChecker $requirements, PermissionsChecker $permissions)
    {
        $this->requirements = $requirements;
        $this->permissions = $permissions;
    }

    public function checkUpdates()
    {
        try {
            $composerFile = base_path('composer.json');

            if (!file_exists($composerFile)) {
                throw new Exception('composer.json not found in the current directory.');
            }

            // dd($composerFile);

            $composer = Factory::create(new NullIO(), $composerFile);


            $lockFile = new JsonFile(base_path('composer.lock'));
            $lockData = $lockFile->read();

            $outdatedPackages = [];

            foreach ($lockData['packages'] as $packageData) {
                $name = $packageData['name'];
                $version = $packageData['version'];

                $latestVersion = $composer->getRepositoryManager()->findPackage($name, '*');

                if ($latestVersion && Comparator::lessThan($version, $latestVersion->getVersion())) {
                    $outdatedPackages[] = [
                        'name' => $name,
                        'current_version' => $version,
                        'latest_version' => $latestVersion->getVersion(),
                    ];
                }
            }

            if (!empty($outdatedPackages)) {
                $message = "Outdated packages:\n";
                foreach ($outdatedPackages as $package) {
                    $message .= "{$package['name']} (current version: {$package['current_version']}, latest version: {$package['latest_version']})\n";
                }
            } else {
                $message = "All packages are up to date.\n";
            }

            return response($message, 200);
        } catch (Exception $e) {
            return response("Error: " . $e->getMessage() . "\n", 500);
        }
    }


    public function getRequirements(){

        $phpSupportInfo = $this->requirements->checkPHPversion(
            config('installer.core.minPhpVersion')
        );

        $requirements = $this->requirements->check(
            config('installer.requirements')
        );

        $permissions = $this->permissions->check(
            config('installer.permissions')
        );

        $data = array();
        $data['phpSupportInfo'] = $phpSupportInfo;
        $data['requirements'] = $requirements;
        $data['permissions'] = $permissions;

        return CommonHelper::responseWithData($data);
    }

    /*Database*/
    public function checkDatabaseConnection($database_host, $database_port, $database_name, $database_username, $database_password){

        $connection  = 'mysql';

        $settings = config("database.connections.$connection");

        config([
            'database' => [
                'default' => $connection,
                'connections' => [
                    $connection => array_merge($settings, [
                        'driver'   => $connection,
                        'host'     => $database_host,
                        'port'     => $database_port,
                        'database' => $database_name,
                        'username' => $database_username,
                        'password' => $database_password,
                    ]),
                ],
            ],
        ]);

        DB::purge();

        try {

            DB::connection()->getPdo();

            return true;

        } catch (\Exception $e) {

            return false;
        }
    }

    public function setDatabase(Request $request){

        $validator = Validator::make($request->all(),[
            'database_host'     => 'required',
            'database_port'     => 'required',
            'database_name'     => 'required',
            'admin_email'       => 'required|email',
            'admin_password'    => 'required|min:6'
        ]);
        if ($validator->fails   ()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        try {

            $database_host = $request->database_host;
            $database_port = $request->database_port;
            $database_name = $request->database_name;
            $database_username = $request->database_username;
            $database_password = $request->database_password;

            $admin_email = $request->admin_email;
            $admin_password = $request->admin_password;

            if (! $this->checkDatabaseConnection($database_host, $database_port, $database_name, $database_username, $database_password) ) {
                return CommonHelper::responseError("Could not connect to the database. Maybe your Database is not available.");
            }

            try {

                $env = new DotenvEditor();

                $env->changeEnv([
                    'DB_HOST'     => $database_host,
                    'DB_PORT'     => $database_port,
                    'DB_DATABASE' => $database_name,
                    'DB_USERNAME' => $database_username,
                    'DB_PASSWORD' => $database_password,
                    'APP_URL'     => url('/'),
                    'APP_ENV'     => 'development'

                ]);

                if (env('INSTALL_MODE') === 'server') {
                    Artisan::call('config:cache');
                    Artisan::call('config:clear');
                    Artisan::call('migrate:fresh');
                    Artisan::call('db:seed');
                    Artisan::call('migrate', ['--path' => 'vendor/laravel/passport/database/migrations']);
                    Artisan::call('passport:install');
                    Artisan::call('storage:link');
                }

                $installedLogFile = storage_path('installed');
                $dateStamp = date('Y/m/d h:i:sa');
                if (! file_exists($installedLogFile)) {
                    $message = "eGrocer Installer successfully Installed on ".$dateStamp."\n";
                    file_put_contents($installedLogFile, $message);
                } else {
                    $message = "eGrocer Installer successfully UPDATED on ".$dateStamp;
                    file_put_contents($installedLogFile, $message.PHP_EOL, FILE_APPEND | LOCK_EX);
                }

                \App\Models\Admin::truncate();
                $superAdmin = \App\Models\Admin::create([
                    'username' => 'superadmin',
                    'email' => $admin_email,
                    'password' => bcrypt($admin_password),
                    'role_id' => 1,
                    'created_by' => 1,
                ]);
                $superAdmin->assignRole('Super Admin');

                $env->changeEnv([
                    'APP_ENV'     => 'production'

                ]);

                return CommonHelper::responseSuccess("Database");

            } catch (\Exception $e) {
                Log::error("Installer -> Database Error : ",[$e]);
                return CommonHelper::responseError("We were able to connect to the database server (which means your username and password is okay) but not able to select the database. Please make sure it exists and that the root user has permission to use the database.");
            }

        } catch (\Exception $e) {
            return CommonHelper::responseError($e->getMessage());
        }

    }

    public function checkPurchaseCode(Request $request){

        $validator = Validator::make($request->all(),[
            'purchase_code'     => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        try {

            $response = app(StoreSettingsApiController::class)->purchaseCode($request->purchase_code,1);
            if($response){

                return CommonHelper::responseSuccess("Valid");
            }else{
                return CommonHelper::responseError("Invalid code supplied!");
            }
        } catch (\Exception $e) {
            return CommonHelper::responseError($e->getMessage());
        }
    }

}
