import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log('✅ Kết nối MySQL thành công');
  } catch(error) {
    console.error('❌ Kết nối MySQL thất bại', error);
    process.exit(1);
  }
}

// Bắt đầu cố gắng kết nối ngay
connectToDB();

// Ngắt kết nối an toàn khi tắt tiến trình
const shutdown = async () => {
  try {
    await prisma.$disconnect();
  } finally {
    process.exit(0);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default prisma;
