<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('users')->insert([
        'name' => 'Gabriel Avner',
        'email' => 'avner00gabriel@gmail.com',
        'password' => bcrypt('Gabr1el@vner.'),
      ]);

      DB::table('users')->insert([
        'name' => 'Thiago Gerson',
        'email' => 'thiago.gerson@happycodeschool.com',
        'password' => bcrypt('admin123'),
      ]);

      DB::table('users')->insert([
        'name' => 'Carmem Viana',
        'email' => 'carmenluciaviana05@hotmail.com',
        'password' => bcrypt('admin123'),
      ]);

      DB::table('users')->insert([
        'name' => 'Pedro R3',
        'email' => 'pedro.junior@happycodeschool.com',
        'password' => bcrypt('admin123'),
      ]);
    }
}
