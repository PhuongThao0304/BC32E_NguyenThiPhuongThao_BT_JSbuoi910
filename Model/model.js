// tạo kiểu dữ liệu nhân viên 

function NhanVien () {
    this.taiKhoan = '';
    this.hoTen = '';
    this.Email ='';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCoBan =0;
    this.chucVu ='';
    this.giolam = 0;
    this.tongLuong = function () {
        var viTri = this.chucVu; 
        var tongLuong = '';
        var ketQua = 0;

        // cách tính lương giữa các cấp khác nhau, dùng if 

        if (viTri === 'Sếp') {
            ketQua = Number(this.luongCoBan)*3;
        } else if (viTri === 'Trưởng phòng') {
            ketQua = Number(this.luongCoBan)*2;
        } else if (viTri === 'Nhân viên') {
            ketQua = Number(this.luongCoBan);
        };
        tongLuong = ketQua  + ' VNĐ';
        return tongLuong ;
    };
    this.xepLoai = function () {
        var xepLoai = '';

        var gioLam = this.giolam;

        if (gioLam >= 192) {
            xepLoai = 'Nhân viên xuất sắc';
        }
        else if (gioLam >= 176 & gioLam < 192) {
            xepLoai = 'Nhân viên giỏi';
        }
        else if (gioLam >= 160 & gioLam < 176) {
            xepLoai = 'Nhân viên khá';
        }
        else if (gioLam < 160) {
            xepLoai = 'Nhân viên trung bình';
        }
        return xepLoai;

    };
};

// +nếu nhân viên có giờ làm trên 192h (>=192): nhân viên xuất sắc
// +nếu nhân viên có giờ làm trên 176h (>=176): nhân viên giỏi
// +nếu nhân viên có giờ làm trên 160h (>=160): nhân viên khá
// +nếu nhân viên có giờ làm dưới 160h: nhân viên trung bình