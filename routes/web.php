<?php

use Illuminate\Support\Facades\Route; 

// Catch-all route for SPA frontend
Route::get('/{any}', function () {
    return view('app');  // 'app' hocche tumi jei blade file theke Vue app load korso
})->where('any', '.*');
