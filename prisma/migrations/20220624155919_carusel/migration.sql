-- CreateTable
CREATE TABLE "carusel" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teamPosition" TEXT NOT NULL,

    CONSTRAINT "carusel_pkey" PRIMARY KEY ("id")
);
