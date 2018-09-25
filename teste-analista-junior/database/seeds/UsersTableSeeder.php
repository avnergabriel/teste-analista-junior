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
    }
}
