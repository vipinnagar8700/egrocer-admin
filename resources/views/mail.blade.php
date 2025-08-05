@extends('layouts.mail')
@section('content')

        @if(isset($type))
            @include('mail/'.$type)
        @endif
   
@endsection
