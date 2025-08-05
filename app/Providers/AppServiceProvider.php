<?php

namespace App\Providers;
use App\Models\Setting;
use Brotzka\DotenvEditor\DotenvEditor;
use Laravel\Passport\Console\ClientCommand;
use Laravel\Passport\Console\InstallCommand;
use Laravel\Passport\Console\KeysCommand;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Schema\Builder;
use Stripe\Stripe;

use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Builder::defaultStringLength(191);
        $this->commands([
            InstallCommand::class,
            ClientCommand::class,
            KeysCommand::class,
        ]);

        Validator::extend('validate_packet_images', function ($attribute, $value, $parameters, $validator) {
            $validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            $maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

            foreach ($value as $subArray) {
                if (!is_array($subArray)) {
                    return false; // Sub-array expected
                }

                foreach ($subArray as $file) {
                    if (!$file->isValid()) {
                        return false; // Check if the file is valid
                    }

                    $extension = $file->getClientOriginalExtension();
                    if (!in_array($extension, $validExtensions)) {
                        return false; // Check if the file extension is valid
                    }

                    if ($file->getSize() > $maxSizeInBytes) {
                        return false; // Check if the file size is within the limit
                    }
                }
            }

            return true;
        });
  




    }
}
