<?php

namespace App\Jobs;

use App\Helpers\CommonHelper;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;



class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;
    protected $type;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order,$type='')
    {
        
        $this->order = $order;
         $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
       
        \Log::info('SendEmailJob handle method called.');

        CommonHelper::sendMailOrderStatus($this->order,false,$this->type); 


    }
}
