<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $table = DB::table('categories');
        $table->insert([
            'name' => "Hogar",
            'active' => true,
        ]);
        $table->insert([
            'name' => "Automovil",
            'active' => true,
        ]);
        $table->insert([
            'name' => "Vacaciones",
            'active' => true,
        ]);
        $table->insert([
            'name' => "Entretenimiento",
            'active' => true,
        ]);
        $table->insert([
            'name' => "Inversiones",
            'active' => true,
        ]);
    }
}
