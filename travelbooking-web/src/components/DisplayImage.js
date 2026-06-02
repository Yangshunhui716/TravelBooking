import { Image } from "react-bootstrap";

const DisplayImage = ({ src, imageUrl, altText = "Hình ảnh dịch vụ" }) => {
    const finalSrc = src || imageUrl;

    return (
        <div 
            className="w-100 d-flex align-items-center justify-content-center "
            style={{
                height: '350px',
                backgroundColor: finalSrc ? 'transparent' : '#b4c6e7',
                border: '1px solid #444',
                overflow: 'hidden'
            }}
        >
            {finalSrc ? (
                <Image 
                    src={finalSrc} 
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