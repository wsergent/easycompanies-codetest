<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->after('remember_token');
            $table->string('token_2fa')->after('phone')->nullable();
            $table->datetime('token_2fa_expiry')->after('token_2fa')->nullable();
            $table->datetime('last_login')->after('token_2fa_expiry')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'token_2fa', 'token_2fa_expiry', 'last_login']);
        });
    }
}
