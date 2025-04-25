# Zyna Music - Ứng dụng Streaming Nhạc

## 📖 Giới thiệu

Zyna Music là một ứng dụng streaming nhạc được xây dựng với Next.js, Material UI và TypeScript. Ứng dụng cung cấp trải nghiệm nghe nhạc tuyệt vời với giao diện người dùng hiện đại và đầy đủ tính năng.

## ✨ Tính năng chính

- 🎵 Phát nhạc trực tuyến với việc hiển thị sóng âm (Waveform)
- 👤 Xác thực người dùng (Đăng nhập/Đăng ký)
- 📱 Giao diện responsive
- 📂 Quản lý playlist
- ❤️ Yêu thích bài hát
- 🎨 Tùy chỉnh giao diện (Theme)
- 👑 Trang quản trị (Admin Dashboard)

## 🛠️ Công nghệ sử dụng

- **Frontend:**

  - Next.js 14
  - Material UI
  - TypeScript
  - SCSS
  - React Query
  - NextAuth.js
  - Wavesurfer.js

- **Kiến trúc:**
  - App Router
  - Server Components
  - Client Components
  - API Routes

## 📁 Cấu trúc thư mục

```
src/
├── app/                  # App router và các pages
│   ├── (admin)/         # Admin pages và components
│   ├── (guest)/         # Guest pages (auth)
│   └── (user)/          # User pages
├── assets/              # Tài nguyên tĩnh
├── components/          # Shared components
├── lib/                 # Utilities
├── types/              # TypeScript types
└── utils/              # Helper functions
```

## 🚀 Cài đặt và Chạy Dự án

1. **Clone dự án:**

   ```bash
   git clone <repository-url>
   cd zyna-music
   ```

2. **Cài đặt dependencies:**

   ```bash
   npm install
   ```

3. **Cấu hình môi trường:**
   Tạo file .env.local với các biến môi trường:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

4. **Khởi chạy development server:**
   ```bash
   npm run dev
   ```

## 👤 Tính năng theo vai trò

### Người dùng

- Đăng nhập/Đăng ký tài khoản
- Nghe nhạc với visualizer
- Tạo và quản lý playlist
- Yêu thích bài hát
- Cập nhật thông tin cá nhân

### Admin

- Quản lý người dùng (CRUD)
- Xem thống kê
- Quản lý nội dung
- Cấu hình hệ thống

## 💻 API Endpoints

### Auth

- POST `/api/auth/signin` - Đăng nhập
- POST `/api/auth/signup` - Đăng ký
- POST `/api/auth/forgot-password` - Quên mật khẩu

### Users

- GET `/api/users` - Lấy danh sách người dùng
- POST `/api/users` - Tạo người dùng mới
- PUT `/api/users/:id` - Cập nhật người dùng
- DELETE `/api/users/:id` - Xóa người dùng

### Tracks

- GET `/api/tracks` - Lấy danh sách bài hát
- POST `/api/tracks` - Upload bài hát mới
- GET `/api/tracks/:id` - Chi tiết bài hát
- DELETE `/api/tracks/:id` - Xóa bài hát

## 🔒 Bảo mật

- Xác thực với NextAuth.js
- JWT cho API calls
- Role-based access control
- Form validation
- API rate limiting

## 🎯 Tối ưu hóa

- Server-side rendering
- Image optimization
- Code splitting
- Lazy loading
- Caching

## 🤝 Đóng góp

Đóng góp luôn được chào đón! Vui lòng:

1. Fork dự án
2. Tạo branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📜 License

Dự án được phân phối dưới giấy phép MIT.
