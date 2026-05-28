import { Image } from "react-bootstrap";

const DisplayImage = ({ imageUrl, altText = "Hình ảnh dịch vụ" }) => {
    return (
        <div 
            className="w-100 d-flex align-items-center justify-content-center"
            style={{
                height: '350px', // Chiều cao cố định theo wireframe
                backgroundColor: imageUrl ? 'transparent' : '#b4c6e7', // Màu xanh dương nhạt khi không có ảnh
                borderRadius: '12px',
                border: '1px solid #444',
                overflow: 'hidden'
            }}
        >
            {imageUrl ? (
                <Image 
                    src={imageUrl} 
                    alt={altText} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
            ) : (
                <span className="text-muted fw-bold">
                    Chưa có hình ảnh
                </span>
            )}
        </div>
    );
};

export default DisplayImage;