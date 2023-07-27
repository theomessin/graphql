-- CreateTable
CREATE TABLE "Hotel" (
    "clientKey" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "hotelName" TEXT NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("apiKey")
);

-- CreateIndex
CREATE INDEX "Hotel_clientKey_idx" ON "Hotel"("clientKey");

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_clientKey_fkey" FOREIGN KEY ("clientKey") REFERENCES "Client"("clientKey") ON DELETE CASCADE ON UPDATE CASCADE;
