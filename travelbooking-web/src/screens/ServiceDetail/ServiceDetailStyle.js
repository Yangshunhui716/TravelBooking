const ServiceDetailStyle = {
    titleBox: {
        border: '1px solid #dee2e6',
        padding: '1rem',
        borderRadius: 8,
        backgroundColor: '#ffffff',
        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    },

    imageWrapper: {
        padding: '0.5rem',
        border: '1px solid #dee2e6',
        borderRadius: 12,
        backgroundColor: '#f8f9fa',
        display: 'flex',
        minHeight: 300,
        overflow: 'hidden', 
    },

    sticky:{
        position: "sticky",
        top: 110,
        height: "fit-content"
    },

    infoCard: {
        border: '1px solid #dee2e6',
        padding: '1.5rem',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)'
    },

    providerAvatar: {
        width: 50,
        height: 50,
        objectFit: 'cover',
        borderRadius: '50%',
        border: '1px solid #dee2e6'
    },

    descriptionText: {
        borderLeft: '3px solid #dee2e6',
        paddingLeft: '15px',
        fontStyle: 'italic',
        color: '#6c757d'
    },

    priceText: {
        fontWeight: 'bold',
        color: '#dc3545',
        margin: 0
    },
};

export default ServiceDetailStyle;