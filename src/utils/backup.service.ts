// File: src/utils/backup.service.ts
import axios from 'axios';

// Link Ngrok cố định của bạn
const BACKUP_URL = 'https://noumenal-treva-objectionably.ngrok-free.dev';

export const backupService = {
    // 1. Gửi dữ liệu đi (Lưu mới)
    // Mình thêm kiểu dữ liệu (any, string) để TypeScript không báo lỗi
    async send(data: any, type: string = 'sql', id: string | null = null) {
        try {
            const payload = {
                id: id || `AUTO_${Date.now()}`,
                type: type,
                // Kết hợp ID vào từ khóa để tìm kiếm cho dễ
                keywords: (id || "") + " " + JSON.stringify(data),
                data: data
            };

            // Gửi đi mà không cần đợi phản hồi (để App chính đỡ bị lag)
            axios.post(`${BACKUP_URL}/api/backup`, payload)
                .then(() => console.log(`✅ [BACKUP] Đã gửi ${type}: ${payload.id}`))
                .catch(err => console.error(`❌ [BACKUP] Lỗi gửi: ${err.message}`));

        } catch (error: any) {
            console.error("❌ [BACKUP] Lỗi hệ thống:", error.message);
        }
    },

    // 2. Cập nhật dữ liệu
    async update(id: string, newData: any, type: string = 'sql') {
        try {
            const payload = {
                id: id,
                type: type,
                keywords: id + " " + JSON.stringify(newData),
                data: newData
            };
            axios.put(`${BACKUP_URL}/api/backup`, payload)
                .then(() => console.log(`🔄 [BACKUP] Đã update: ${id}`))
                .catch(err => console.error(`❌ [BACKUP] Lỗi update: ${err.message}`));
        } catch (error) {
            console.error(error);
        }
    }
};