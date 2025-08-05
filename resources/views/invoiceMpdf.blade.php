@php
    $appName = \App\Models\Setting::get_value('app_name');
    if($appName == "" || $appName == null){
        $appName = "eGrocer";
    }

    $supportEmail = \App\Models\Setting::get_value('support_email');
    if($supportEmail == "" || $supportEmail == null){
        $supportEmail = "";
    }
    $supportNumber = \App\Models\Setting::get_value('support_number');
    if($supportNumber == "" || $supportNumber == null){
        $supportNumber = "";
    }
    $logo = \App\Models\Setting::get_value('logo') ?? "";
    if($logo!==""){
        $logo_full_path =  url('/').'/storage/'.$logo;
    }else{
        $logo_full_path =  asset('images/favicon.png');
    }
    $currency = \App\Models\Setting::get_value('currency') ?? '$';
@endphp
<html>
    <head>
        <title>Invoice Order - {{ $appName }}</title>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="{{ asset('assets/css/custom/common.css') }}">
        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body>
        <section class="invoice" id="printMe">
            <table width="100%">
                <tr>
                    <td width="50%"style="text-align: left;"><h2> <img src="{{ $logo_full_path }}" height="45"> {{ $appName }}</h2></td>
                    <td width="50%" style="text-align: right;"><h2>Invoice</h2><h5 style="text-align: left;"><b>No : </b>#{{ $order->order_item_id }} </h5></td>
                </tr><br>
                <tr>
                    <td colspan="2" width="99.9%" style="text-align: right;"><h5>Mo. {{ $supportNumber }}</h5></td>
                </tr>
            </table>
            <br>
            <table width="100%">
                <tr>
                    <td width="33.3">
                        <div class="text-left">
                            <span style="font-weight: bold;">From</span>
                            <address>
                                <strong>{{ $appName }}</strong>
                            </address>
                            <address>
                                Email: {{ $supportEmail }}<br>
                            </address>
                            <address>
                                Customer Care : {{ $supportNumber }}
                            </address>
                            <address>
                                @if($order->delivery_boy_name)
                                    <p>Delivery By : {{ $order->delivery_boy_name ?? "" }}</p>
                                @else
                                    <p>Delivery By : Not Assigned</p>
                                @endif
                            </address>
                        </div>
                    </td>
                    <td width="33.3">
                        <div class="text-center">
                            <span style="font-weight: bold;"> Shipping Address </span>
                            <address>
                                <strong>{{ $order->user_name ?? "" }}</strong>
                            </address>
                            <address>
                                {{ $order->address ?? "" }}<br>
                            </address>
                            <address>
                                <strong>{{ $order->mobile }} / {{ $order->alternate_mobile }} </strong><br>
                            </address>
                            <address>
                                <strong>{{ $order->user_email }}</strong><br>
                            </address>
                        </div>
                    </td>
                    <td width="33.3">
                        <div class="text-right">
                            <span style="font-weight: bold;">Retail Invoice</span>
                            <address>
                                <b>Order No : </b>#{{ $order->order_item_id }}
                            </address>
                            <address>
                                <b>Date: </b>{{ \Carbon\Carbon::parse($order->orders_created_at)->format('d-m-y h:i A') }}
                            </address>
                        </div>
                    </td>
                </tr>
            </table>
            <br>
            <div class="well">
                <table width="100%">
                    <tr>
                        <td width="50%"><div>
                                <p style="font-weight: bold;">Sold By</p>
                                <strong>{{ $order->store_name }}</strong>
                                <p>Name: {{ $order->seller_name }}</p>
                                <p>Email: {{ $order->seller_email }}</p>
                                <p>Mobile No. : {{ $order->seller_mobile }}</p>
                            </div></td>
                        <td width="50%" style="padding-left: 150px;"><div>
                                <strong>
                                    <p>Pan Number : {{ $order->pan_number }}</p>
                                    <p>{{ $order->tax_name }} : {{ $order->tax_number }}</p>
                                </strong>
                                @if($order->delivery_boy_name)
                                    <p>Delivery By : {{ $order->delivery_boy_name ?? "" }}</p>
                                @else
                                    <p>Delivery By : Not Assigned</p>
                                @endif
                            </div></td>
                    </tr>
                </table>
            </div>
            <div class="well">
                <h4>Product Details:</h4><br>
                <style>
                    .product-table thead tr th {
                        padding: 8px;
                        background-color: #37a279;
                        color: white;
                    }
                    .product-table tbody tr td {
                        padding: 8px;
                    }

                    .product-table tfoot tr td {
                        padding: 8px;
                    }
                </style>
                <table class="table-condensed table-bordered product-table"  width="100%">
                    <thead>
                        <tr>
                            <th align="center" width="5%">Sr No.</th>
                            <th align="center" width="35%">Name</th>
                            <th align="center" width="10%">Unit</th>
                            <th align="center" width="10%">Price</th>
                            <th align="center" width="15%">Tax {{ $currency }} (%)</th>
                            <th align="center" width="10%">Qty</th>
                            <th align="center" width="20%">SubTotal ( {{ $currency }} )</th>
                        </tr>
                    </thead>
                    <tbody>
                    @php
                        $total_tax_amount = 0;
                        $total_quantity = 0;
                        $total_sub_total = 0;
                    @endphp
                    @foreach($order_items as $index => $item)
                        <tr>
                            <td align="center">{{ $index+1 }}<br></td>
                            <td align="left">{{ $item->product_name }}<br></td>
                            <td align="right">{{ $item->variant_name }}<br></td>
                            <td>{{ ($item->discounted_price != 0 && $item->discounted_price != "") ? $item->discounted_price : $item->price }}</td>
                            <td align="right">{{ $item->tax_amount. "  (" .$item->tax_percentage."%)" }}<br></td>
                            <td align="right">{{ $item->quantity }}<br></td>
                            <td align="right">{{ $item->sub_total }}<br></td>
                            @php
                                $total_tax_amount = $total_tax_amount + $item->tax_amount;
                                $total_quantity = $total_quantity + $item->quantity;
                                $total_sub_total = $total_sub_total + $item->sub_total;
                            @endphp
                        </tr>
                    @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="4" width="60%" align="center">Total</th>
                            <td align="right">{{ $total_tax_amount }}<br></td>
                            <td align="right">{{ $total_quantity }}<br></td>
                            <td align="right">{{ $total_sub_total }}<br></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <br><br><br>
            <table width="100%">
                <tr>
                    <td width="50%"style="text-align: left;">
                        <p><span style="font-weight: bold;">Payment Method : </span> {{ strtoupper($order->payment_method) }}</p>
                       
                        <br><br><br>
                        <p><img src="{{ $logo_full_path }}" height="40"></p>
                        <br>
                        <p style="font-weight: bold"> Thank you for shopping</p>
                        <p style="font-weight: bold"> With Us. </p>
                    </td>
                    <td width="50%" style="text-align: right;">
                        <table class="product-table">
                            <tbody>
                                <tr>
                                    <td align="left">Total Order Price ({{ $currency }})</td>
                                    <th align="right">{{ $order->total }}</th>
                                </tr>
                                <tr>
                                    <td align="left">Delivery Charge ({{ $currency }})</td>
                                    <th align="right">{{ $order->delivery_charge }}</th>
                                </tr>
                                <tr>
                                    <td align="left">Discount {{ $currency }} (%)</td>
                                    @php
                                        $discount_in_rupees = 0;
                                        if ( $order->discount > 0) {
                                            $discounted_amount = $order->total * $order->discount / 100;
                                            $final_total = $order->total - $discounted_amount;
                                            $discount_in_rupees = $order->total - $final_total;
                                        }
                                    @endphp
                                    <th align="right">{{ '- ' . $discount_in_rupees . ' (' . $order->discount . '%)'}}</th>
                                </tr>
                                <tr>
                                    <td align="left">Promo ({{ $order->promo_code }}) Discount ({{ $currency }})</td>
                                    <th align="right">{{ '- ' . $order->promo_discount }}</th>
                                </tr>
                                <tr>
                                    <td align="left">Wallet Used ({{ $currency }})</td>
                                    <th align="right">{{ '- ' . $order->wallet_balance }}</th>
                                </tr>
                                <tr>
                                    <th align="left" style="padding: 8px; background-color: #37a279; color: white;">Final Total ({{ $currency }})</th>
                                    <th align="right" style="padding: 8px; background-color: #37a279; color: white;">{{ '= ' . $order->final_total }}</th>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </table>
        </section>
    </body>
</html>
