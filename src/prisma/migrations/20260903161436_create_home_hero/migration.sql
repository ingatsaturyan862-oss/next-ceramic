-- CreateTable
CREATE TABLE "HomeHero" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "imgUrlMobile" TEXT NOT NULL,
    "imgUrlDesktop" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HomeHero_pkey" PRIMARY KEY ("id")
);
