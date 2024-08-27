/*
  Warnings:

  - Added the required column `customerAddress` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "task" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerAddress" TEXT NOT NULL,
    "receiveDate" DATETIME NOT NULL,
    "priority" TEXT NOT NULL,
    "productColor" TEXT NOT NULL,
    "productBrand" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "problemFound" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Task" ("completed", "customerEmail", "customerName", "customerPhone", "id", "priority", "problemFound", "productBrand", "productColor", "productType", "receiveDate", "task") SELECT "completed", "customerEmail", "customerName", "customerPhone", "id", "priority", "problemFound", "productBrand", "productColor", "productType", "receiveDate", "task" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
