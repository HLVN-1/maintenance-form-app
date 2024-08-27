-- CreateTable
CREATE TABLE "Task" (
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
    "productQuantity" TEXT NOT NULL,
    "problemFound" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
