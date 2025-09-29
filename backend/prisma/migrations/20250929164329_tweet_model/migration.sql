-- CreateTable
CREATE TABLE "prismaORM"."Tweet" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tweetImageUrl" TEXT,
    "autherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "prismaORM"."Tweet" ADD CONSTRAINT "Tweet_autherId_fkey" FOREIGN KEY ("autherId") REFERENCES "prismaORM"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
