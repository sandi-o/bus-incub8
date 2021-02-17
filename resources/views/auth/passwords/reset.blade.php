@extends('layouts.app')

@section('content')
<app-reset-password
    :email_address="{{ json_encode($email) }}"
    :token="{{ json_encode($token) }}"
></app-reset-password>
@endsection
