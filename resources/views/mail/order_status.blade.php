
<h1 style="line-height: 24px; margin-bottom:15px; font-size: 20px;" >{{ ucwords($subject) }}  </h1>

@php
    $currency = \App\Models\Setting::get_value('currency') ?? '$';
@endphp

@if(isset($assign) && $assign == true)

    @if(isset($seller) && !empty($seller))

        <p style="line-height: 24px; margin-bottom:15px;">
            Dear, {{ $seller->name }}
        </p>

        <p style="line-height: 24px; margin-bottom: 15px;">
            You order, #{{ $order->id }} is just assigned a delivery boy.
        </p>

        <h1 style="line-height: 24px; margin-bottom:15px; font-size: 20px;"> Delivery Boy details </h1>

        <table border="1" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
            <tr>
                <td align="left"> Name </td>
                <td align="left"> {{$deliveryBoy->name}} </td>

                <td align="left"> Date of Birth </td>
                <td align="left"> {{$deliveryBoy->dob}} </td>
            </tr>
            <tr>
                <td align="left"> Email </td>
                <td align="left"> {{$deliveryBoy->email}} </td>

                <td align="left"> Mobile </td>
                <td align="left"> {{$deliveryBoy->mobile}} </td>
            </tr>
        </table><br>
    @else
        <p style="line-height: 24px; margin-bottom:15px;">
            Dear, {{ $deliveryBoy->name }}
        </p>
        <p style="line-height: 24px; margin-bottom: 15px;">
          You have just assigned new order, #{{ $order->id }}.
        </p>
    @endif

    <p style="line-height: 24px; margin-bottom: 15px;">
        Estimated delivery time is {{ $order->delivery_time }}
    </p>

    <p style="line-height: 24px; margin-bottom: 15px;">
        <strong>
            Delivery address :-
        </strong><br>
        {{ $order->address }}
    </p>

    <a href="{{ $redirect_url }}" style="color: #ffffff; text-decoration: none;">
        <table border="0" align="center" width="180" cellpadding="0" cellspacing="0" bgcolor="#37a279" style="margin-bottom:20px;">
            <tr>
                <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
            </tr>
            <tr>
                <td align="center" style="color: #ffffff; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 22px; letter-spacing: 2px;">
                    <!-- main section button -->
                    <div style="line-height: 22px;">
                        Check it out
                    </div>
                </td>
            </tr>
            <tr>
                <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
            </tr>
        </table>
    </a>

@else
    @if($user_type == 0)
        {{--here customer mail--}}

        @if($order->active_status == \App\Models\OrderStatusList::$received)

            <p style="line-height: 24px; margin-bottom:15px;">
                Dear, {{ $user->name }}
            </p>

            <p style="line-height: 24px; margin-bottom: 15px;">
                Your order has been received.
            </p>
            <p style="line-height: 24px;margin-bottom:15px;">
                This notification is just a friendly reminder (not a bill or a second charge) that on {{ $order->created_at }} you placed an order from
                {{ $app_name }}.
                The charge will appear on your bill.
                This is just a reminder to help you recognise the charge.
            </p>

            <div class="row">
                <p class="h6 ">Product Details:</p>
                <div class="row">
                    <div class="col-xs-12 table-responsive">
                        <table class="table">
                            <thead class="text-center">
                            <tr>
                                <th>Sr No.</th>
                                <th>Name</th>
                                <th>Unit</th>
                                <th>Price</th>
                                <th>Tax {{ $currency }} (%)</th>
                                <th>Qty</th>
                                <th>SubTotal ( {{ $currency }} )</th>
                            </tr>
                            </thead>
                            <tbody class="text-center">
                            @php
                                $total_tax_amount = 0;
                                $total_quantity = 0;
                                $total_sub_total = 0;
                                $order_items = $order->items;
                            @endphp
                            @foreach($order_items as $index => $item)
                                <tr>
                                    <td>{{ $index+1 }}<br></td>
                                    <td>{{ $item->product_name }}<br></td>
                                    <td>{{ $item->variant_name }}<br></td>
                                    <td>{{ $item->discounted_price > 0 ? $item->discounted_price : $item->price }}</td>
                                    <td>{{ $item->tax_amount. "  (" .$item->tax_percentage."%)" }}<br></td>
                                    <td>{{ $item->quantity }}<br></td>
                                    <td>{{ $item->sub_total }}<br></td>
                                    @php
                                        $total_tax_amount = $total_tax_amount + $item->quantity;
                                        $total_quantity = $total_quantity + $item->quantity;
                                        $total_sub_total = $total_sub_total + $item->sub_total;
                                    @endphp
                                </tr>
                            @endforeach
                            </tbody>
                            <tfoot class="text-center">
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Total</th>
                                <td>{{ $total_tax_amount }}<br></td>
                                <td>{{ $total_quantity }}<br></td>
                                <td>{{ $total_sub_total }}<br></td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <p><b>Payment Method : </b> {{ strtoupper($order->payment_method) }}</p>
                <div class="table-responsive">
                    <table>
                        <tbody>
                        <tr>
                            <th>Total Order Price ({{ $currency }})</th>
                            <td>{{ $order->total }}</td>
                        </tr>
                        <tr>
                            <th>Delivery Charge ({{ $currency }})</th>
                            <td>{{ $order->delivery_charge }}</td>
                        </tr>
                        <tr>
                            <th>Discount {{ $currency }} (%)</th>
                            @php
                                $discount_in_rupees = 0;
                                if ( $order->discount > 0) {
                                    $discounted_amount = $order->total * $order->discount / 100;
                                    $final_total = $order->total - $discounted_amount;
                                    $discount_in_rupees = $order->total - $final_total;
                                }
                            @endphp
                            <td>{{ '- ' . $discount_in_rupees . ' (' . $order->discount . '%)'}}</td>
                        </tr>
                        <tr>
                            <th>Promo ({{ $order->promo_code }}) Discount ({{ $currency }})</th>
                            <td>{{ '- ' . $order->promo_discount }}</td>
                        </tr>
                        <tr>
                            <th>Wallet Used ({{ $currency }})</th>
                            <td>{{ '- ' . $order->wallet_balance }}</td>
                        </tr>
                        <tr>
                            <th>Final Total ({{ $currency }})</th>
                            <td>{{ '= ' . ceil($order->final_total)}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <p style="line-height: 24px; margin-bottom: 15px;">
                We would like to take this opportunity to thank you for your business and look forward to serving you in the future.
            </p>
        @elseif(in_array($order->active_status, array(
                                                \App\Models\OrderStatusList::$processed,
                                                \App\Models\OrderStatusList::$shipped,
                                                \App\Models\OrderStatusList::$outForDelivery
                                             )
                        )
            )
            <p style="line-height: 24px; margin-bottom:15px;">
                Dear, {{ $user->name }}
            </p>

            <p style="line-height: 24px; margin-bottom: 15px;">
                Your order has been {{ $status_name }}.
            </p>

            <p style="line-height: 24px; margin-bottom: 15px;">
                This notification is just a friendly reminder (not a bill or a second charge) that on {{ $order->created_at }} you placed an order from
                {{ $app_name }}.
                The charge will appear on your bill.
                This is just a reminder to help you recognise the charge.
            </p>
            <p style="line-height: 24px; margin-bottom: 15px;">
                Order summary
                #{{ $order->id }}
                Final Total - {{ $currency }} {{ $order->final_total }}
                We would like to take this opportunity to thank you for your business and look forward to serving you in the future.
            </p>
        @elseif($order->active_status == \App\Models\OrderStatusList::$delivered)
            <p style="line-height: 24px; margin-bottom:15px;">
                Dear, {{ $user->name }}
            </p>

            <p style="line-height: 24px; margin-bottom: 15px;">
                Your order has been {{ $status_name }}.
            </p>

            <p style="line-height: 24px; margin-bottom: 15px;">
                This notification is just a friendly reminder (not a bill or a second charge) that on {{ $order->created_at }} you placed an order from
                {{ $app_name }}.
                The charge will appear on your bill.
            </p>

            {{--@include('invoice')--}}

        @elseif(in_array($order->active_status, array(
                                                \App\Models\OrderStatusList::$cancelled,
                                                \App\Models\OrderStatusList::$returned,
                                             )
                        )
        )

            <p style="line-height: 24px; margin-bottom:15px;">
                Dear, {{ $user->name }}
            </p>

            <p style="line-height: 24px; margin-bottom: 15px;">
                Sorry to see your order #{{ $order->id }} belonging to {{ $user->name }} has been
                {{ $status_name }} and if cash on delivery - message will be - that you haven't been charged for it if order prepaid - message will be - You will get refund within few business days.
            </p>
            <div class="d-flex justify-content-between">
                <p><b>Payment Method : </b> {{ strtoupper($order->payment_method) }}</p>
                <div class="table-responsive">
                    <table>
                        <tbody>
                        <tr>
                            <th>Total Order Price ({{ $currency }})</th>
                            <td>{{ $order->total }}</td>
                        </tr>
                        <tr>
                            <th>Delivery Charge ({{ $currency }})</th>
                            <td>{{ $order->delivery_charge }}</td>
                        </tr>
                        <tr>
                            <th>Discount {{ $currency }} (%)</th>
                            @php
                                $discount_in_rupees = 0;
                                if ( $order->discount > 0) {
                                    $discounted_amount = $order->total * $order->discount / 100;
                                    $final_total = $order->total - $discounted_amount;
                                    $discount_in_rupees = $order->total - $final_total;
                                }
                            @endphp
                            <td>{{ '- ' . $discount_in_rupees . ' (' . $order->discount . '%)'}}</td>
                        </tr>
                        <tr>
                            <th>Promo ({{ $order->promo_code }}) Discount ({{ $currency }})</th>
                            <td>{{ '- ' . $order->promo_discount }}</td>
                        </tr>
                        <tr>
                            <th>Wallet Used ({{ $currency }})</th>
                            <td>{{ '- ' . $order->wallet_balance }}</td>
                        </tr>
                        <tr>
                            <th>Final Total ({{ $currency }})</th>
                            <td>{{ '= ' . ceil($order->final_total)}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        {{--@elseif($order->active_status == \App\Models\OrderStatusList::$cancelled)
        @elseif($order->active_status == \App\Models\OrderStatusList::$returned)--}}
        @endif
    @else
        {{--here customer mail--}}
        @if($role == \App\Models\Role::$roleSeller)

            <p style="line-height: 24px; margin-bottom:15px;">
                Dear, {{ $seller->name }}
            </p>

            @if($order->active_status == \App\Models\OrderStatusList::$received)
                <p style="line-height: 24px; margin-bottom:15px;">
                    You have just received new order, #{{ $order->id }}
                </p>
            @else
                <p style="line-height: 24px; margin-bottom:15px;">
                    {{ $subject }}
                </p>
            @endif

            @php
                $redirect_url = (isset($order->id)) ? url('/seller/orders/view/'.$order->id): url('/seller/orders');
            @endphp
        @elseif($role == \App\Models\Role::$roleDeliveryBoy)

            <p style="line-height: 24px; margin-bottom:15px;">
                Dear, {{ $deliveryBoy->name }}
            </p>

            <p style="line-height: 24px; margin-bottom:15px;">
                You have just assigned new order, #{{ $order->id }}
            </p>

            <p style="line-height: 24px; margin-bottom:15px;">

                Estimated delivery time is {{ $order->delivery_time }}
            </p>

            <p style="line-height: 24px; margin-bottom:15px;">
                {{ $subject }}
            </p>

            @php
                $redirect_url = (isset($order->id)) ? url('/delivery_boy/orders/view/'.$order->id): url('/delivery_boy/orders');
            @endphp
        @else

            <p style="line-height: 24px; margin-bottom:15px;">
                Dear, {{ $admin->name }}
            </p>

            @if($order->active_status == \App\Models\OrderStatusList::$received)
                <p style="line-height: 24px; margin-bottom:15px;">
                    You have just received new order, #{{ $order->id }}
                </p>
            @else
                <p style="line-height: 24px; margin-bottom:15px;">
                    {{ $subject }}
                </p>
            @endif
            @php
                $redirect_url = (isset($order->id)) ? url('/orders/view/'.$order->id): url('/orders');
            @endphp
        @endif

        <a href="{{ $redirect_url }}" style="color: #ffffff; text-decoration: none;">
            <table border="0" align="center" width="180" cellpadding="0" cellspacing="0" bgcolor="#37a279" style="margin-bottom:20px;">
                <tr>
                    <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                </tr>
                <tr>
                    <td align="center" style="color: #ffffff; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 22px; letter-spacing: 2px;">
                        <!-- main section button -->
                        <div style="line-height: 22px;">
                            Check it out
                        </div>
                    </td>
                </tr>
                <tr>
                    <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                </tr>
            </table>
        </a>
    @endif
@endif
