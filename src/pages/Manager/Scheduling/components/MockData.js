export const STAFF_DATA = {
  // Full-time
  "An": { id: "FT001", fullName: "Nguyễn Bình An", role: "Full-time", position: "Trưởng ca" },
  "Bình": { id: "FT002", fullName: "Lê Văn Bình", role: "Full-time", position: "Phục vụ" },
  "Dũng": { id: "FT003", fullName: "Phạm Anh Dũng", role: "Full-time", position: "Tiếp thực" },
  "Nam": { id: "FT004", fullName: "Nguyễn Hải Nam", role: "Full-time", position: "Pha chế" },
  "Sơn": { id: "FT005", fullName: "Trần Thế Sơn", role: "Full-time", position: "Bếp trưởng" },
  "Hà": { id: "FT006", fullName: "Nguyễn Thu Hà", role: "Full-time", position: "Kế toán" },
  "Tuấn": { id: "FT007", fullName: "Lý Anh Tuấn", role: "Full-time", position: "Bếp phó" },
  "Yến": { id: "FT008", fullName: "Bùi Hoàng Yến", role: "Full-time", position: "Lễ tân" },
  "Quân": { id: "FT009", fullName: "Đỗ Minh Quân", role: "Full-time", position: "Bảo vệ" },
  "Thảo": { id: "FT010", fullName: "Lê Phương Thảo", role: "Full-time", position: "Quản lý" },

  // Part-time
  "Chi": { id: "PT001", fullName: "Hoàng Yến Chi", role: "Part-time", position: "Thu ngân" },
  "Hoa": { id: "PT002", fullName: "Trương Quỳnh Hoa", role: "Part-time", position: "Lễ tân" },
  "Linh": { id: "PT003", fullName: "Mai Diệu Linh", role: "Part-time", position: "Phục vụ" },
  "Cường": { id: "PT004", fullName: "Nguyễn Văn Cường", role: "Part-time", position: "Tiếp thực" },
  "Đạt": { id: "PT005", fullName: "Trần Quốc Đạt", role: "Part-time", position: "Pha chế" },
  "Giang": { id: "PT006", fullName: "Lê Hương Giang", role: "Part-time", position: "Phục vụ" },
  "Hùng": { id: "PT007", fullName: "Vũ Mạnh Hùng", role: "Part-time", position: "Phụ bếp" },
  "Kiên": { id: "PT008", fullName: "Đỗ Trung Kiên", role: "Part-time", position: "Thu ngân" },
  "Minh": { id: "PT009", fullName: "Hoàng Đức Minh", role: "Part-time", position: "Phục vụ" },
  "Ngân": { id: "PT010", fullName: "Phạm Kim Ngân", role: "Part-time", position: "Lễ tân" },
};

export const INITIAL_SCHEDULE = {
  "2026-03-27": {
    "Hành chính": ["An", "Bình", "Sơn"],
    "Ca Sáng": ["Chi", "Hoa"],
    "Ca Tối": ["Linh", "Cường"]
  }
};