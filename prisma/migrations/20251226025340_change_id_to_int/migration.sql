/*
  Warnings:

  - The primary key for the `blogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `blogs` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `failed_jobs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `failed_jobs` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `jobs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `jobs` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `live_chat_scripts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `live_chat_scripts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `menus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `category_id` on the `menus` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `menus` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `order_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `order_items` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `order_id` on the `order_items` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `order_settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `order_settings` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `created_by_user_id` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `customer_id` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `updated_by_user_id` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `privacy_policies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `privacy_policies` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `restaurant_addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `restaurant_addresses` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `restaurant_phone_numbers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `restaurant_phone_numbers` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `restaurant_working_hours` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `restaurant_working_hours` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `sessions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `site_settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `site_settings` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `social_media_handles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `social_media_handles` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `table_bookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `table_bookings` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `terms_and_conditions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `terms_and_conditions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `testimonies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `testimonies` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_blogs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_blogs" ("content", "created_at", "id", "image", "name", "updated_at") SELECT "content", "created_at", "id", "image", "name", "updated_at" FROM "blogs";
DROP TABLE "blogs";
ALTER TABLE "new_blogs" RENAME TO "blogs";
CREATE TABLE "new_categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_categories" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
CREATE TABLE "new_customers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT,
    "phone_number" TEXT,
    "address" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_customers" ("address", "created_at", "email", "id", "name", "phone_number", "updated_at") SELECT "address", "created_at", "email", "id", "name", "phone_number", "updated_at" FROM "customers";
DROP TABLE "customers";
ALTER TABLE "new_customers" RENAME TO "customers";
CREATE TABLE "new_failed_jobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "connection" TEXT NOT NULL,
    "queue" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "exception" TEXT NOT NULL,
    "failed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_failed_jobs" ("connection", "exception", "failed_at", "id", "payload", "queue", "uuid") SELECT "connection", "exception", "failed_at", "id", "payload", "queue", "uuid" FROM "failed_jobs";
DROP TABLE "failed_jobs";
ALTER TABLE "new_failed_jobs" RENAME TO "failed_jobs";
CREATE UNIQUE INDEX "failed_jobs_uuid_unique" ON "failed_jobs"("uuid");
CREATE TABLE "new_jobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "queue" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL,
    "reserved_at" INTEGER,
    "available_at" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL
);
INSERT INTO "new_jobs" ("attempts", "available_at", "created_at", "id", "payload", "queue", "reserved_at") SELECT "attempts", "available_at", "created_at", "id", "payload", "queue", "reserved_at" FROM "jobs";
DROP TABLE "jobs";
ALTER TABLE "new_jobs" RENAME TO "jobs";
CREATE INDEX "jobs_queue_index" ON "jobs"("queue");
CREATE TABLE "new_live_chat_scripts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "script_code" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_live_chat_scripts" ("created_at", "id", "name", "script_code", "updated_at") SELECT "created_at", "id", "name", "script_code", "updated_at" FROM "live_chat_scripts";
DROP TABLE "live_chat_scripts";
ALTER TABLE "new_live_chat_scripts" RENAME TO "live_chat_scripts";
CREATE TABLE "new_menus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "image" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "menus_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE RESTRICT
);
INSERT INTO "new_menus" ("category_id", "created_at", "description", "id", "image", "name", "price", "updated_at") SELECT "category_id", "created_at", "description", "id", "image", "name", "price", "updated_at" FROM "menus";
DROP TABLE "menus";
ALTER TABLE "new_menus" RENAME TO "menus";
CREATE INDEX "menus_category_id_foreign" ON "menus"("category_id");
CREATE TABLE "new_order_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "menu_name" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" DECIMAL NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE RESTRICT
);
INSERT INTO "new_order_items" ("created_at", "id", "menu_name", "order_id", "quantity", "subtotal", "updated_at") SELECT "created_at", "id", "menu_name", "order_id", "quantity", "subtotal", "updated_at" FROM "order_items";
DROP TABLE "order_items";
ALTER TABLE "new_order_items" RENAME TO "order_items";
CREATE INDEX "order_items_order_id_foreign" ON "order_items"("order_id");
CREATE TABLE "new_order_settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price_per_mile" DECIMAL NOT NULL,
    "distance_limit_in_miles" INTEGER NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_order_settings" ("created_at", "distance_limit_in_miles", "id", "price_per_mile", "updated_at") SELECT "created_at", "distance_limit_in_miles", "id", "price_per_mile", "updated_at" FROM "order_settings";
DROP TABLE "order_settings";
ALTER TABLE "new_order_settings" RENAME TO "order_settings";
CREATE TABLE "new_orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_no" TEXT NOT NULL,
    "customer_id" INTEGER,
    "order_type" TEXT NOT NULL,
    "created_by_user_id" INTEGER,
    "updated_by_user_id" INTEGER,
    "total_price" DECIMAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "status_online_pay" TEXT,
    "session_id" TEXT,
    "payment_method" TEXT NOT NULL,
    "additional_info" TEXT,
    "delivery_fee" DECIMAL,
    "delivery_distance" TEXT,
    "price_per_mile" DECIMAL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "orders_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT "orders_updated_by_user_id_fkey" FOREIGN KEY ("updated_by_user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE RESTRICT
);
INSERT INTO "new_orders" ("additional_info", "created_at", "created_by_user_id", "customer_id", "delivery_distance", "delivery_fee", "id", "order_no", "order_type", "payment_method", "price_per_mile", "session_id", "status", "status_online_pay", "total_price", "updated_at", "updated_by_user_id") SELECT "additional_info", "created_at", "created_by_user_id", "customer_id", "delivery_distance", "delivery_fee", "id", "order_no", "order_type", "payment_method", "price_per_mile", "session_id", "status", "status_online_pay", "total_price", "updated_at", "updated_by_user_id" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
CREATE INDEX "orders_created_by_user_id_foreign" ON "orders"("created_by_user_id");
CREATE INDEX "orders_customer_id_foreign" ON "orders"("customer_id");
CREATE INDEX "orders_updated_by_user_id_foreign" ON "orders"("updated_by_user_id");
CREATE TABLE "new_privacy_policies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_privacy_policies" ("content", "created_at", "id", "updated_at") SELECT "content", "created_at", "id", "updated_at" FROM "privacy_policies";
DROP TABLE "privacy_policies";
ALTER TABLE "new_privacy_policies" RENAME TO "privacy_policies";
CREATE TABLE "new_restaurant_addresses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_restaurant_addresses" ("address", "created_at", "id", "updated_at") SELECT "address", "created_at", "id", "updated_at" FROM "restaurant_addresses";
DROP TABLE "restaurant_addresses";
ALTER TABLE "new_restaurant_addresses" RENAME TO "restaurant_addresses";
CREATE TABLE "new_restaurant_phone_numbers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phone_number" TEXT NOT NULL,
    "use_whatsapp" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_restaurant_phone_numbers" ("created_at", "id", "phone_number", "updated_at", "use_whatsapp") SELECT "created_at", "id", "phone_number", "updated_at", "use_whatsapp" FROM "restaurant_phone_numbers";
DROP TABLE "restaurant_phone_numbers";
ALTER TABLE "new_restaurant_phone_numbers" RENAME TO "restaurant_phone_numbers";
CREATE TABLE "new_restaurant_working_hours" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "working_hours" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_restaurant_working_hours" ("created_at", "id", "updated_at", "working_hours") SELECT "created_at", "id", "updated_at", "working_hours" FROM "restaurant_working_hours";
DROP TABLE "restaurant_working_hours";
ALTER TABLE "new_restaurant_working_hours" RENAME TO "restaurant_working_hours";
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" INTEGER,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "payload" TEXT NOT NULL,
    "last_activity" INTEGER NOT NULL
);
INSERT INTO "new_sessions" ("id", "ip_address", "last_activity", "payload", "user_agent", "user_id") SELECT "id", "ip_address", "last_activity", "payload", "user_agent", "user_id" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
CREATE INDEX "sessions_last_activity_index" ON "sessions"("last_activity");
CREATE INDEX "sessions_user_id_index" ON "sessions"("user_id");
CREATE TABLE "new_site_settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT,
    "currency_symbol" TEXT,
    "currency_code" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_site_settings" ("country", "created_at", "currency_code", "currency_symbol", "id", "updated_at") SELECT "country", "created_at", "currency_code", "currency_symbol", "id", "updated_at" FROM "site_settings";
DROP TABLE "site_settings";
ALTER TABLE "new_site_settings" RENAME TO "site_settings";
CREATE TABLE "new_social_media_handles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "handle" TEXT NOT NULL,
    "social_media" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_social_media_handles" ("created_at", "handle", "id", "social_media", "updated_at") SELECT "created_at", "handle", "id", "social_media", "updated_at" FROM "social_media_handles";
DROP TABLE "social_media_handles";
ALTER TABLE "new_social_media_handles" RENAME TO "social_media_handles";
CREATE TABLE "new_table_bookings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "persons" INTEGER NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_table_bookings" ("created_at", "date", "email", "id", "name", "persons", "phone", "time", "updated_at") SELECT "created_at", "date", "email", "id", "name", "persons", "phone", "time", "updated_at" FROM "table_bookings";
DROP TABLE "table_bookings";
ALTER TABLE "new_table_bookings" RENAME TO "table_bookings";
CREATE TABLE "new_terms_and_conditions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_terms_and_conditions" ("content", "created_at", "id", "updated_at") SELECT "content", "created_at", "id", "updated_at" FROM "terms_and_conditions";
DROP TABLE "terms_and_conditions";
ALTER TABLE "new_terms_and_conditions" RENAME TO "terms_and_conditions";
CREATE TABLE "new_testimonies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_testimonies" ("content", "created_at", "id", "name", "updated_at") SELECT "content", "created_at", "id", "name", "updated_at" FROM "testimonies";
DROP TABLE "testimonies";
ALTER TABLE "new_testimonies" RENAME TO "testimonies";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "status" INTEGER NOT NULL DEFAULT 0,
    "notice" TEXT,
    "phone_number" TEXT,
    "address" TEXT,
    "profile_picture" TEXT,
    "activation_token" TEXT,
    "remember_token" TEXT,
    "two_factor_auth" INTEGER NOT NULL DEFAULT 0,
    "email_verified_at" DATETIME,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_users" ("activation_token", "address", "created_at", "email", "email_verified_at", "first_name", "id", "last_name", "middle_name", "notice", "password", "phone_number", "profile_picture", "remember_token", "role", "status", "two_factor_auth", "updated_at") SELECT "activation_token", "address", "created_at", "email", "email_verified_at", "first_name", "id", "last_name", "middle_name", "notice", "password", "phone_number", "profile_picture", "remember_token", "role", "status", "two_factor_auth", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
