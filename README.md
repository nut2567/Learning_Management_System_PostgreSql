# Learning_Management_System

## Getting Started

1.docker-compose up -d
รัน image postgresql

# รัน PostgreSQL

2.มีไฟล์ env แล้ว ถ้าไม่มีให้เพิ่ม DATABASE_URL="postgresql://admin:admin@localhost:5432/mydb"

3.npx prisma migrate dev --name init
(npx peisma generate แบบไม่ migrate)

4.npm run seed เพิ่มข้อมูล user เบื้องต้น ข้อมูลตามไฟล lib/userinfo.ts

5.run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
