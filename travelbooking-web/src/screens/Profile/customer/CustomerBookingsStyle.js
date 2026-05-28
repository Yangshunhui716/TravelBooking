

const BookingStyle = {

    container: {
        width: "100%"
    },

    pageTitle: {
        marginBottom: "14px",
        fontWeight: "700",
        fontSize: "24px"
    },

    card: {
        border: "2px solid #333",
        borderRadius: "16px",
        padding: "10px 14px",
        marginBottom: "10px",
        backgroundColor: "#fff"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px"
    },

    serviceSection: {
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },

    image: {
        width: "65px",
        height: "65px",
        objectFit: "cover",
        borderRadius: "10px",
        border: "1px solid #ddd"
    },

    topRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "2px"
    },

    title: {
        margin: 0,
        fontSize: "16px",
        fontWeight: "600",
        maxWidth: "360px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },

    detailBtn: {
        background: "#a9d7ff",
        border: "2px solid #333",
        borderRadius: "8px",
        padding: "4px 10px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "12px"
    },

    destination: {
        margin: "2px 0 0 0",
        color: "#666",
        fontSize: "13px"
    },

    date: {
        fontSize: "13px",
        fontWeight: "500",
        color: "#555"
    },

    body: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "6px"
    },

    item: {
        flex: 1,
        textAlign: "center"
    },

    label: {
        fontSize: "13px",
        color: "#777"
    },

    value: {
        marginTop: "2px",
        marginBottom: 0,
        fontSize: "15px",
        fontWeight: "700"
    },

    divider: {
        width: "1px",
        height: "28px",
        backgroundColor: "#ddd"
    },

    footer: {
        marginTop: "10px",
        display: "flex",
        gap: "6px"
    },

    confirmed: {
        background: "#d4edda",
        color: "#155724",
        padding: "4px 10px",
        borderRadius: "7px",
        fontSize: "12px",
        fontWeight: "600"
    },

    pending: {
        background: "#fff3cd",
        color: "#856404",
        padding: "4px 10px",
        borderRadius: "7px",
        fontSize: "12px",
        fontWeight: "600"
    },

    cancelled: {
        background: "#f8d7da",
        color: "#721c24",
        padding: "4px 10px",
        borderRadius: "7px",
        fontSize: "12px",
        fontWeight: "600"
    },

    paid: {
        background: "#cce5ff",
        color: "#004085",
        padding: "4px 10px",
        borderRadius: "7px",
        fontSize: "12px",
        fontWeight: "600"
    },

    unpaid: {
        background: "#f8d7da",
        color: "#721c24",
        padding: "4px 10px",
        borderRadius: "7px",
        fontSize: "12px",
        fontWeight: "600"
    }
};

export default BookingStyle;
