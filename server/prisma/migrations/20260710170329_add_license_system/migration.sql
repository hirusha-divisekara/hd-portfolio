-- CreateTable
CREATE TABLE "License" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "licenseKey" TEXT NOT NULL,
    "edition" TEXT NOT NULL DEFAULT 'STANDARD',
    "activated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "License_licenseKey_key" ON "License"("licenseKey");
