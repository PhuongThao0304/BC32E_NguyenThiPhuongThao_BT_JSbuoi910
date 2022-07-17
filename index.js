
// tạo mảng chứa thông tin nhân viên 
var mangNV = [];
//khi người dùng nhập thông tin và click button "thêm người dùng" thì in thông tin ra table 
document.querySelector('#btnThemNV').onclick = function () {

    // tạo đối tượng nhân viên 
    var nhanVien = new NhanVien();

    // lấy thông tin người dùng nhập 

    nhanVien.taiKhoan = document.querySelector('#tknv').value;
    nhanVien.hoTen = document.querySelector('#name').value;
    nhanVien.Email = document.querySelector('#email').value;
    nhanVien.matKhau = document.querySelector('#password').value;
    nhanVien.ngayLam = document.querySelector('#datepicker').value;
    nhanVien.luongCoBan = document.querySelector('#luongCB').value;
    nhanVien.chucVu = document.querySelector('#chucvu').value;
    nhanVien.giolam = document.querySelector('#gioLam').value;

    // validation 

    var valid = true; // mặc định form là hợp lệ

    //kiểm tra rỗng 

    valid &= kiemTraRong(nhanVien.taiKhoan, '#tbTKNV', 'Tài khoản') & kiemTraRong(nhanVien.hoTen, '#tbTen', 'Họ tên') & kiemTraRong(nhanVien.Email, '#tbEmail', 'Email') & kiemTraRong(nhanVien.matKhau, '#tbMatKhau', 'Mật khẩu') & kiemTraRong(nhanVien.ngayLam, '#tbNgay', 'Ngày làm') & kiemTraRong(nhanVien.luongCoBan, '#tbLuongCB', 'Lương cơ bản') & kiemTraRong(nhanVien.chucVu, '#tbChucVu', 'Chức vụ') & kiemTraRong(nhanVien.giolam, '#tbGiolam', 'Giờ làm');

    //kiểm tra định dạng dữ liệu. 


    valid &= kiemTraTatCaSo(nhanVien.taiKhoan, '#So_taikhoan', 'Tài khoản') & kiemTraDoDai(nhanVien.taiKhoan, '#dodai_taikhoan', 'Tài khoản', 4, 6) & kiemTraTatCaKyTu(nhanVien.hoTen, '#kytu_hoten', "Họ tên ") & kiemTraEmail(nhanVien.Email, '#error_email', "Email ") & kiemTraDoDai(nhanVien.matKhau, '#dodai_matkhau', 'Mật khẩu', 6, 10) & kiemTraGiaTri(nhanVien.luongCoBan, '#giatri_luongCB', 'Lương cơ bản', 1000000, 200000000) & kiemTraHopLe(nhanVien.chucVu, '#chucvu_hopLe', 'Chức vụ') & kiemTraGiaTri(nhanVien.giolam, '#kiemtra_giolam', 'Giờ làm', 80, 200);

    if (!valid) {//khác true khi đã dính vào ít nhất 1 if ở trên
        return;
    }


    // mỗi lần người dùng bấm thêm thì sẽ thêm thông tin vào mangNV;

    mangNV.push(nhanVien);

    renderMangNhanVien(mangNV);

    luuLocalStorage();


}


// xây dựng function renderMangNhanVien 

/**
 * 
 * @param {*} arrayNhanVien mảng nhân viên đã lấy đươc từ người dùng 
 * @returns giá trị trả về là html để đưa vào giao diện
 */

function renderMangNhanVien(arrayNhanVien) {
    var html = '';

    // duyệt mảng 

    for (index = 0; index < arrayNhanVien.length; index++) {
        var nhanVien = arrayNhanVien[index];
        // tính tổng lương cho nhân viên 
        // lấy ra vị trí của nhanVien[index] để so sánh 



        nhanVien.tinhtongLuong = function () {
            var tongLuong = '';
            var viTri = nhanVien.chucVu;
            var ketQua = 0;

            // cách tính lương giữa các cấp khác nhau, dùng if 

            if (viTri === 'Sếp') {
                ketQua = Number(nhanVien.luongCoBan) * 3;
            } else if (viTri === 'Trưởng phòng') {
                ketQua = Number(nhanVien.luongCoBan) * 2;
            } else if (viTri === 'Nhân viên') {
                ketQua = Number(nhanVien.luongCoBan);
            };
            tongLuong = ketQua + ' VNĐ';
            return tongLuong;
        }
        // xét xếp loại 

        nhanVien.xetXepLoai = function () {
            var xepLoai = '';
            var gioLam = nhanVien.giolam;
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



        //tạo ra 1 chuỗi html tr và đưa vào output
        html += `
        <tr>
        <td>${nhanVien.taiKhoan} </td>
        <td>${nhanVien.hoTen} </td>
        <td>${nhanVien.Email} </td>
        <td> ${nhanVien.ngayLam} </td>
        <td>${nhanVien.chucVu} </td>
        <td> ${(nhanVien.tinhtongLuong())}</td>
        <td>${(nhanVien.xetXepLoai())} </td>
        <td> <button class="btn btn-danger" onclick ="xoaNhanVien('${nhanVien.taiKhoan}')"> Xoá</button>
        <button class="btn btn-primary" data-toggle="modal"
        data-target="#myModal" onclick ="chinhSua('${nhanVien.taiKhoan}')"> Chỉnh sửa</button>
         </td>
        
        </tr>

        `;
    }

    document.querySelector('#tableDanhSach').innerHTML = html;

    return html;

}

// luuLocalStorage();

function luuLocalStorage() {

    //biến đổi mảng thành chuỗi (string)
    var sMangNV = JSON.stringify(mangNV);
    localStorage.setItem('mangNV', sMangNV);
};

function layLocalStorage() {
    //check xem storage có dữ liệu đó hay không 
    if (localStorage.getItem('mangNV')) {
        //lấy ra 
        var sMangNV = localStorage.getItem('mangNV');
        // lấy mangSinhVien gán = chuỗi dc lấy từ localstorage ra (phải dùng hàm JSON.parse để chuyển về mảng lại)
        mangNV = JSON.parse(sMangNV);
        //tạo ra table sinh viên từ mảng
        renderMangNhanVien(mangNV);
    }
}

function xoaNhanVien(taiKhoanClick) {
  
    var indexDel = mangNV.findIndex(nhanVien => nhanVien.taiKhoan === taiKhoanClick);

    if (indexDel != -1) {
        mangNV.splice(indexDel, 1);
    }
    
    renderMangNhanVien(mangNV);
    luuLocalStorage();// (nếu muốn xoá rồi lưu luôn thì gọi hàm lưu )

}


//chỉnh sửa 
function chinhSua(taikhoanClick) {

    //tìm index trong mảng Nhân viên của tài khoản được click 

    var indexEdit = mangNV.findIndex(nhanVien => nhanVien.taiKhoan === taikhoanClick);

    var nhanVienEdit = mangNV[indexEdit];

    //khoá lại mã sinh viên 
    document.querySelector('#tknv').disabled = true;

    // push thông tin của nhanVien edit lên lại khung nhập 

    document.querySelector('#tknv').value = nhanVienEdit.taiKhoan;
    document.querySelector('#name').value = nhanVienEdit.hoTen;
    document.querySelector('#email').value = nhanVienEdit.Email;
    document.querySelector('#password').value = nhanVienEdit.matKhau;
    document.querySelector('#datepicker').value = nhanVienEdit.ngayLam;
    document.querySelector('#luongCB').value = nhanVienEdit.luongCoBan;
    document.querySelector('#chucvu').value = nhanVienEdit.chucVu;
    document.querySelector('#gioLam').value = nhanVienEdit.giolam;

}


// sau khi chỉnh sửa => click cập nhật 

document.querySelector('#btnCapNhat').onclick = function () {

    // tạo và lấy thông tin của đối tượng nv được update 

    var nhanVienupdate = new NhanVien ();

    nhanVienupdate.taiKhoan = document.querySelector('#tknv').value;
    nhanVienupdate.hoTen = document.querySelector('#name').value;
    nhanVienupdate.Email = document.querySelector('#email').value;
    nhanVienupdate.matKhau = document.querySelector('#password').value;
    nhanVienupdate.ngayLam = document.querySelector('#datepicker').value;
    nhanVienupdate.luongCoBan = document.querySelector('#luongCB').value;
    nhanVienupdate.chucVu = document.querySelector('#chucvu').value;
    nhanVienupdate.giolam = document.querySelector('#gioLam').value;


    // validation 
    var valid = true; // mặc định form là hợp lệ

    //kiểm tra rỗng 

    valid &= kiemTraRong(nhanVienupdate.taiKhoan, '#tbTKNV', 'Tài khoản') & kiemTraRong(nhanVienupdate.hoTen, '#tbTen', 'Họ tên') & kiemTraRong(nhanVienupdate.Email, '#tbEmail', 'Email') & kiemTraRong(nhanVienupdate.matKhau, '#tbMatKhau', 'Mật khẩu') & kiemTraRong(nhanVienupdate.ngayLam, '#tbNgay', 'Ngày làm') & kiemTraRong(nhanVienupdate.luongCoBan, '#tbLuongCB', 'Lương cơ bản') & kiemTraRong(nhanVienupdate.chucVu, '#tbChucVu', 'Chức vụ') & kiemTraRong(nhanVienupdate.giolam, '#tbGiolam', 'Giờ làm');

    //kiểm tra định dạng dữ liệu. 


    valid &= kiemTraTatCaSo(nhanVienupdate.taiKhoan, '#So_taikhoan', 'Tài khoản') & kiemTraDoDai(nhanVienupdate.taiKhoan, '#dodai_taikhoan', 'Tài khoản', 4, 6) & kiemTraTatCaKyTu(nhanVienupdate.hoTen, '#kytu_hoten', "Họ tên ") & kiemTraEmail(nhanVienupdate.Email, '#error_email', "Email ") & kiemTraDoDai(nhanVienupdate.matKhau, '#dodai_matkhau', 'Mật khẩu', 6, 10) & kiemTraGiaTri(nhanVienupdate.luongCoBan, '#giatri_luongCB', 'Lương cơ bản', 1000000, 200000000) & kiemTraHopLe(nhanVienupdate.chucVu, '#chucvu_hopLe', 'Chức vụ') & kiemTraGiaTri(nhanVienupdate.giolam, '#kiemtra_giolam', 'Giờ làm', 80, 200);

    if (!valid) {//khác true khi đã dính vào ít nhất 1 if ở trên
        return;
    }


   // => tìm index của nhân viên (trong mảng)được thay đổi và thay thông tin mới vào 

   var indexEdit = mangNV.findIndex(nv => nv.taiKhoan === nv.taiKhoan);

//    đưa các thông tin update lấy dc từ người dùng ở trên vào đúng vị trí trong mảng (indexedit)

mangNV[indexEdit].hoTen = nhanVienupdate.hoTen;
mangNV[indexEdit].Email = nhanVienupdate.Email;
mangNV[indexEdit].matKhau = nhanVienupdate.matKhau;
mangNV[indexEdit].ngayLam = nhanVienupdate.ngayLam;
mangNV[indexEdit].luongCoBan = nhanVienupdate.luongCoBan;
mangNV[indexEdit].chucVu = nhanVienupdate.chucVu;
mangNV[indexEdit].giolam = nhanVienupdate.giolam;

 renderMangNhanVien(mangNV);
//  mở lại nút tai khoan 
document.querySelector('#tknv').disabled =false;
 luuLocalStorage(); 
    
}



// chọn loại sinh viên => xuất ra danh sách chỉ có loại sinh viên đó
function sortNV () {
    // lấy thông tin on change 

    var findNV = document.querySelector('#searchName').value;

    

   // output: 1 mảng mới chứa các phần tử đã chọn 

   var mangNVsort = [];

   

//duyệt mảng mangNV để tìm ra nhân viên theo loại 

for (index =0; index < mangNV.length; index++) {

    // do trong object ko có sẵn xếp loại => tính rồi mới so sánh dc 
        var xepLoai = '';
        var gioLam = mangNV[index].giolam;
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
        };
    

if (findNV === xepLoai) {

    // => push object mangNV[index] vào mảng mới 

    mangNVsort.push(mangNV[index]);
}

}

renderMangNhanVien(mangNVsort);

}

//gọi hàm lấy localstorage khi trang vừa load 
window.onload = function () {
    // browser vừa load lên làm gì thì sẽ code ở đây
    layLocalStorage();
}

console.log('Nhan viên',mangNV);




