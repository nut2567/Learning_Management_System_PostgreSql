# Learning Management System

### การเริ่มต้นใช้งาน

ทำตามขั้นตอนเหล่านี้เพื่อเซ็ตอัพและรันโปรเจกต์ในเครื่องของคุณ

1. Clone Repository
   -> git clone https://github.com/nut2567/Learning_Management_System_PostgreSql

2. รัน PostgreSQL ด้วย Docker
   ให้แน่ใจว่า Docker เปิดใช้งานในเครื่องของคุณก่อนที่จะทำขั้นตอนนี้
   -> docker-compose up -d
   คำสั่งนี้จะทำการเริ่มต้น PostgreSQL container บนเครื่องของคุณ ตรวจสอบว่า Docker Desktop หรือเครื่องมือที่ใช้ในการรัน Docker ทำงานอยู่

3. รัน PostgreSQL

   ตั้งค่าฐานข้อมูล
   หากคุณยังไม่มีไฟล์ .env ให้สร้างไฟล์ .env และเพิ่มข้อมูลนี้:
   -> DATABASE_URL="postgresql://admin:admin@localhost:5432/mydb"

4. ใช้ Prisma Migrations
   รันคำสั่ง Prisma เพื่อสร้าง schema ของฐานข้อมูล:
   -> npx prisma migrate dev --name init
   หากคุณไม่ต้องการรัน migration แต่แค่ต้องการสร้าง Prisma models ให้ใช้คำสั่งนี้แทน:
   -> npx peisma generate
   (แบบไม่ migrate)

5. Seed ข้อมูลเบื้องต้น
   เพิ่มข้อมูลเบื้องต้นลงในฐานข้อมูลโดยใช้คำสั่งต่อไปนี้:
   -> npm run user_seed
   เพิ่มข้อมูล user เบื้องต้น ข้อมูลตามไฟล lib/userinfo.ts
   -> npm run courses_seed
   เพิ่มข้อมูล courses เบื้องต้น ข้อมูลตามไฟล lib/courses_seed.ts
   ตรวจสอบฐานข้อมูลถ้าไม่ติดอะไรจะได้ข้อมูลเพื่อใช้กับหน้าเว็บแล้ว

6. รัน Development Server
   รันเซิร์ฟเวอร์สำหรับการพัฒนาโดยใช้คำสั่งใดคำสั่งหนึ่งด้านล่างนี้:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

7. เปิดเว็บแอป
   เปิดเว็บแอปที่ [http://localhost:4000](http://localhost:4000) บนเบราว์เซอร์ของคุณเพื่อดูผลลัพธ์

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## ภาพรวมของโปรเจกต์และเหตุผลในการออกแบบ

โปรเจกต์นี้เป็นระบบการจัดการการเรียนรู้ (Learning Management System หรือ LMS) ที่ใช้ฐานข้อมูล PostgreSQL โดยมีการใช้ Prisma สำหรับการจัดการฐานข้อมูล และสามารถปรับใช้ได้ง่ายสำหรับการพัฒนาเพิ่มเติมในอนาคต

## เหตุผลในการออกแบบ

การใช้ Docker: การใช้ Docker ทำให้สามารถตั้งค่าสภาพแวดล้อมในการพัฒนาได้ง่ายและรวดเร็ว สามารถทำงานได้ในทุกเครื่องที่รองรับ Docker
การใช้ Prisma: Prisma ถูกเลือกเพื่อจัดการการเชื่อมต่อกับฐานข้อมูล PostgreSQL เนื่องจากเป็นเครื่องมือที่ช่วยให้การทำงานกับฐานข้อมูลเป็นไปได้อย่างราบรื่นและมีประสิทธิภาพ
ระบบการ Seed ข้อมูล: มีระบบ Seed ข้อมูลเพื่อให้สามารถเริ่มต้นการใช้งานโปรเจกต์ได้ทันทีหลังจากติดตั้ง

## ข้อสมมติฐานที่ทำไว้และส่วนที่ต้องการปรับปรุงในอนาคต

ข้อสมมติฐานที่ทำไว้
การตั้งค่า Docker และฐานข้อมูล PostgreSQL จะทำงานได้อย่างราบรื่นในทุกเครื่องที่รองรับ Docker
ข้อมูลที่เก็บในฐานข้อมูลจะมีการจัดการอย่างมีระเบียบ และสามารถขยายได้ในอนาคต
ส่วนที่ต้องการปรับปรุงในอนาคต
การตรวจสอบความถูกต้องของข้อมูล (Validation): ระบบยังไม่มีการตรวจสอบข้อมูลที่กรอกเข้ามาอย่างละเอียด เช่น การตรวจสอบรูปแบบอีเมล หรือรหัสผ่านที่ปลอดภัย ซึ่งสามารถเพิ่มในอนาคต
ฟีเจอร์การจัดการผู้ใช้: อาจพิจารณาเพิ่มฟีเจอร์สำหรับการจัดการผู้ใช้แบบ admin
เช่น การจัดการข้อมูลคอร์ส การสร้าง/ลบคอร์ส หรือการจัดการผู้ใช้ การเขียน unit tests ให้คอบคุมทุกกรณี ที่หน้าเพจสามารถเล่นได้
การเพิ่มประสิทธิภาพ: ส่วนที่ใช้ Prisma ในบางคำสั่งอาจจะสามารถปรับปรุงให้ทำงานได้รวดเร็วขึ้น เช่น การทำ query ที่ซับซ้อนให้มีประสิทธิภาพมากขึ้น

# รันเทส

รันทั้งหมด
npm test

(src/**tests**/components/FilterBar.test.tsx)

เช็คการทำงานของ FilterBar ในการเลือกตัวเลือก

(src/**tests**/components/ProductList.test.tsx)

เช็คการทำงานของ ProductList ว่าสามารถวาดการ์ดของวิชาการสอนได้และมีองประกอบของกล่องการ์ดครบทุกส่วน
ถ้าไม่มีข้อมูลมาจะต้องแสดงข้อความว่าไม่มีข้อมูล

(src/**tests**/api/getproduct.test.tsx)

เช็คการทำงานของ /api/getcourse ว่าสามารถส่งค่า course มาแล้วเรียกใช้งาน ค่า course ได้ ลองส่งตัวกรองแล้วได้ค่าตามที่กรอง
กรณี api error จะต้องแสดงข้อความ error

(src/**tests**/api/getInstructors.test.tsx)

เช็คการทำงานของ /api/getInstructors ว่าสามารถส่งค่า user มาแล้วเรียกใช้งาน ค่า user ได้
กรณี api error จะต้องแสดงข้อความ error

(src/**tests**/page/page.test.tsx)

เช็คการทำงานของ /api/getcourse ว่าสามารถส่งค่า course มาแล้วเรียกใช้งาน ค่า course ได้
และทำงานร่วมกับ components ProductList ว่าสามารถวาดการ์ดของ course ได้และมีองประกอบของกล่องการ์ดครบทุกส่วน
เมื่อส่งตัวกรองแล้ว components ProductList ได้ค่าตามที่กรอง
เมื่อจัดเรียงแล้ว components ProductList ได้ค่าเรียงตามที่เลือก ทำงานรวมกันในหน้า homepage หน้าหลักที่เรียกใช้งาน

(src/**tests**/page/pageFilter.test.tsx)

ทดสอบส่วนตัวกรอง

(src/**tests**/page/pageSort.test.tsx)

ทดสอบส่วนจัดเรียง

รันในโหมดดูการเปลี่ยนแปลงไฟล์
npm test:watch
