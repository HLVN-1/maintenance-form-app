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
    "customerHours" TEXT NOT NULL DEFAULT '',
    "route" TEXT NOT NULL,
    "receiveDate" DATETIME NOT NULL,
    "priority" TEXT NOT NULL,
    "productColor" TEXT NOT NULL,
    "productBrand" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "productQuantity" TEXT NOT NULL,
    "problemFound" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Task" ("completed", "customerAddress", "customerEmail", "customerHours", "customerName", "customerPhone", "id", "priority", "problemFound", "productBrand", "productColor", "productQuantity", "productType", "receiveDate", "route", "task") SELECT "completed", "customerAddress", "customerEmail", "customerHours", "customerName", "customerPhone", "id", "priority", "problemFound", "productBrand", "productColor", "productQuantity", "productType", "receiveDate", "route", "task" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
