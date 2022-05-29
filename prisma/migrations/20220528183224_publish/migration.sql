-- CreateTable
CREATE TABLE "publish" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "publish_pkey" PRIMARY KEY ("id")
);
