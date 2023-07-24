// lưu xuống local
export const luuXuongLocal = (name, data) => {
    localStorage.setItem(name,JSON.stringify(data));
};

// lấy dữ liệu local
export const layDuLieuLocal = (ten) =>{
    const value = localStorage.getItem(ten);
    
    if(JSON.parse(value)){
        return JSON.parse(value);
    } else{
        return {};
    };
};