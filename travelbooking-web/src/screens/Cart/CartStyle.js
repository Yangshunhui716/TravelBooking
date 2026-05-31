const styles = {
    container: {
        marginTop: "1.5rem",
        marginBottom: "3rem"
    },
    mainTitle: {
        fontWeight: "bold",
        color: "#495057",
        marginBottom: "1.5rem"
    },
    cardItem: {
        marginBottom: "1rem",
        border: "1px solid #dee2e6", // Đã làm rõ nét đường viền bao quanh 1 dịch vụ
        borderRadius: "16px",
        boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.04)",
        padding: "0.75rem"
    },
    itemTitle: {
        fontWeight: "bold",
        color: "#212529",
        marginBottom: "0.5rem"
    },
    priceText: {
        color: "#dc3545",
        fontWeight: "bold"
    },
    totalText: {
        color: "#0d6efd",
        fontWeight: "bold"
    },
    hotelInfo: {
        marginTop: "0.5rem",
        color: "#6c757d",
        fontSize: "12px"
    },
    paymentCard: {
        border: "1px solid #dee2e6", // Thêm đường viền cho cả khung tổng cộng phía dưới
        borderRadius: "16px",
        boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.04)",
        backgroundColor: "#f8f9fa",
        padding: "1rem"
    },
    paymentGroup: {
        border: "1px solid #dee2e6",
        borderRadius: "50rem",
        padding: "0.25rem",
        backgroundColor: "#fff",
        display: "flex",
        gap: "0.25rem",
        boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.05)"
    },
    pillButton: {
        borderRadius: "50rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.25rem",
        paddingBottom: "0.25rem",
        fontWeight: "bold"
    },
    checkoutButton: {
        width: "100%",
        borderRadius: "50rem",
        fontWeight: "bold",
        boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.15)"
    }
};

export default styles;