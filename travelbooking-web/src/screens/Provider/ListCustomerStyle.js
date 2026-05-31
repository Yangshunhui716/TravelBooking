const ListCustomerStyle = {
    title: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#212529"
    },
    tableResponsive: {
        border: "2px solid #212529",
        borderRadius: "16px",
        overflow: "hidden", // Giúp các góc bảng không bị tràn ra ngoài viền bo tròn
        backgroundColor: "#fff"
    },
    table: {
        margin: 0, // Xóa bỏ margin mặc định của Bootstrap Table để khít viền ngoài
        borderStyle: "hidden" // Ẩn viền vuông mặc định ngoài cùng để dùng viền của wrapper
    },
    thWidthSm: {
        width: "60px"
    },
    avatar: {
        width: "45px",
        height: "45px",
        objectFit: "cover"
    }
};

export default ListCustomerStyle;