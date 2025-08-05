<?php

namespace App\Helpers;

use App\Models\Currency;
use App\Models\Order;
use App\Models\Setting;

class PaypalClient
{
    private $access_token;
    private $base_url;
    function __construct()
    {
        Setting::get_value("paystack_secret_key")??'';
        $this->base_url = env('PAYPAL_BASE_URL');
        $this->access_token = $this->getAccessToken();
    }

    public function getAccessToken()
    {
        $clientId = env('PAYPAL_USERNAME');
        $secret = env('PAYPAL_PASSWORD');

        $url = $this->base_url.'oauth2/token';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERPWD, $clientId . ":" . $secret);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
        $server_output = curl_exec($ch);

        $result = json_decode($server_output);
        return $result->access_token;
    }


    /*public function createPayment($order, $device_type)
    {
        $currency_code = $order->currency->code;
        $subtotal = 0;
        $itemsArray = [];
        foreach ($order->orderItems as $orderItem) {
            $price = round(($orderItem->price / $order->conversion_rate),2);
            $itemsArray[] = [
                'name' => $orderItem->product_name,
                'description' => $orderItem->product_name,
                'quantity' => $orderItem->quantity,
                'price' => $price,
                'tax' => "0.00",
                'sku' => "1",
                'currency' => $currency_code,
            ];

            $subtotal += $price * $orderItem->quantity;
        }

        $shipping_charge = round($order->shipping_charge / $order->conversion_rate,2);
        $gift_charge = round($order->gift_charge / $order->conversion_rate,2);
        $cod_charge = round($order->cod_charge / $order->conversion_rate,2);
        $discount_amount = round($order->discount_amount / $order->conversion_rate,2);

        $city = '';
        $state = '';
        $country_code = '';

        if(!is_null($order->deliveryAddress->city)){
            $city = $order->deliveryAddress->city->name;
            $state = $order->deliveryAddress->city->state->short_code != "" ? $order->deliveryAddress->city->state->short_code : $order->deliveryAddress->city->state->name;
            $country_code = $order->deliveryAddress->city->state->country->sortname;

        }else if(!is_null($order->deliveryAddress->country)){
            $city = $order->deliveryAddress->country->name;
            $state = $order->deliveryAddress->country->name;
            $country_code = $order->deliveryAddress->country->sortname;
        }

        $dataArray = [
            "intent" => "sale",
            "payer" => [
                'payment_method' => "paypal"
            ],
            "transactions" => array([
                "amount" => [
                    "total" => round(($order->amount / $order->conversion_rate),2),
                    "currency" => $currency_code,
                    "details" => [
                        "subtotal" => round($subtotal,2),
                        "tax" => "0.00",
                        "shipping" => $shipping_charge,
                        "handling_fee" => $gift_charge + $cod_charge,
                        "shipping_discount" => $discount_amount,
                        "insurance" => "0.00",
                    ]
                ],
                "description" => "Payment of order {$order->order_id}",
                //"custom" => "EBAY_EMS_90048630024435",
                "invoice_number" => $order->order_id,
                "payment_options" => [
                    "allowed_payment_method" => "INSTANT_FUNDING_SOURCE"
                ],
                //"soft_descriptor" => "ECHI5786786",
                "item_list" => [
                    "items" => $itemsArray,
                    "shipping_address" => [
                        "recipient_name" => $order->userDetail->name,
                        "line1" => $order->deliveryAddress->address,
                        "line2" => $order->deliveryAddress->address_1,
                        "city" => $city,
                        "country_code" => $country_code,
                        "postal_code" => $order->deliveryAddress->pincode,
                        "phone" => $order->userDetail->mobile_1,
                        "state" => $state,
                    ],
                ]
            ]),
            "note_to_payer" => "Contact us for any questions on your order.",
            "redirect_urls" => [
                "return_url" =>  url('api/paypal_callback/return?device_type='.$device_type),
                "cancel_url" =>  url('api/paypal_callback/cancel?device_type='.$device_type),
            ]
        ];

        $data = json_encode($dataArray);

        $url = $this->base_url.'payments/payment';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Authorization: Bearer ' . $this->access_token,
                "Content-length: " . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $server_output = curl_exec($ch);

        $result = json_decode($server_output, true);
        if(!isset($result['id']))
        {
            \Log::error("Request:: \n".$data."\n\nResponse:: \n".$server_output);
        }
        return $server_output;
    }*/
    public function createPayment($orders, $device_type)
    {
        $itemsArray = [];
        $subtotal = 0;
        $currency_code = $orders[0]->currency->code;
        $shipping_charge = 0;
        $gift_charge = 0;
        $cod_charge = 0;
        $discount_amount = 0;
        $order_amount = 0;
        foreach ($orders as $order){
            foreach ($order->orderItems as $orderItem) {
                $price = round(($orderItem->price / $order->conversion_rate),2);
                $itemsArray[] = [
                    'name' => $orderItem->product_name,
                    'description' => $orderItem->product_name,
                    'quantity' => $orderItem->quantity,
                    'price' => $price,
                    'tax' => "0.00",
                    'sku' => "1",
                    'currency' => $currency_code,
                ];

                $subtotal += $price * $orderItem->quantity;
            }
            $shipping_charge += round($order->shipping_charge / $order->conversion_rate,2);
            $gift_charge += round($order->gift_charge / $order->conversion_rate,2);
            $cod_charge += round($order->cod_charge / $order->conversion_rate,2);
            $discount_amount += round($order->discount_amount / $order->conversion_rate,2);
            $order_amount += round(($order->amount / $order->conversion_rate),2);
        }
        $city = '';
        $state = '';
        $country_code = '';

        if(!is_null($orders[0]->deliveryAddress->city)){
            $city = $orders[0]->deliveryAddress->city->name;
            $state = $orders[0]->deliveryAddress->city->state->short_code != "" ? $orders[0]->deliveryAddress->city->state->short_code : $orders[0]->deliveryAddress->city->state->name;
            $country_code = $orders[0]->deliveryAddress->city->state->country->sortname;

        }else if(!is_null($orders[0]->deliveryAddress->country)){
            $city = $orders[0]->deliveryAddress->country->name;
            $state = $orders[0]->deliveryAddress->country->name;
            $country_code = $orders[0]->deliveryAddress->country->sortname;
        }

        $dataArray = [
            "intent" => "sale",
            "payer" => [
                'payment_method' => "paypal"
            ],
            "transactions" => array([
                "amount" => [
                    "total" => round($order_amount,2),
                    "currency" => $currency_code,
                    "details" => [
                        "subtotal" => round($subtotal,2),
                        "tax" => "0.00",
                        "shipping" => round($shipping_charge,2),
                        "handling_fee" => round($gift_charge + $cod_charge,2),
                        "shipping_discount" => round($discount_amount,2),
                        "insurance" => "0.00",
                    ]
                ],
                "description" => "Payment of order {$orders[0]->order_id}",
                //"custom" => "EBAY_EMS_90048630024435",
                "invoice_number" => $orders[0]->order_id,
                "payment_options" => [
                    "allowed_payment_method" => "INSTANT_FUNDING_SOURCE"
                ],
                //"soft_descriptor" => "ECHI5786786",
                "item_list" => [
                    "items" => $itemsArray,
                    "shipping_address" => [
                        "recipient_name" => $orders[0]->userDetail->name,
                        "line1" => $orders[0]->deliveryAddress->address,
                        "line2" => $orders[0]->deliveryAddress->address_1,
                        "city" => $city,
                        "country_code" => $country_code,
                        "postal_code" => $orders[0]->deliveryAddress->pincode,
                        "phone" => $orders[0]->userDetail->mobile_1,
                        "state" => $state,
                    ],
                ]
            ]),
            "note_to_payer" => __('Contactus_for_any_questions_on_your_order'),
            "redirect_urls" => [
                "return_url" =>  url('api/paypal_callback/return?device_type='.$device_type),
                "cancel_url" =>  url('api/paypal_callback/cancel?device_type='.$device_type),
            ]
        ];

        $data = json_encode($dataArray);

        $url = $this->base_url.'payments/payment';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Authorization: Bearer ' . $this->access_token,
                "Content-length: " . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $server_output = curl_exec($ch);

        $result = json_decode($server_output, true);
        if(!isset($result['id']))
        {
            \Log::error("Request:: \n".$data."\n\nResponse:: \n".$server_output);
        }
        return $server_output;
    }

    public function excecutePayment($payment_id, $payer_id)
    {
        $url = $this->base_url.'payments/payment/' . $payment_id . '/execute';
        $data = [
            "payer_id" => $payer_id
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Authorization: Bearer ' . $this->access_token
            )
        );
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $server_output = curl_exec($ch);

        return $server_output;
    }

    public function getPayment($payment_id)
    {
        $url = $this->base_url.'payments/payment/' . $payment_id;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Authorization: Bearer ' . $this->access_token
            )
        );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);

        return $server_output;
    }
}
