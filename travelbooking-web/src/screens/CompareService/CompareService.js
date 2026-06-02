import { useContext } from "react";
import { MyCompareContext } from "../../configs/Context";
import { Link } from "react-router-dom";

const CompareService = () => {
    const [compareList, compareDispatch] = useContext(MyCompareContext);

    const handleRemove = (id) => {
        compareDispatch({ type: 'REMOVE_SERVICE', payload: id });
    };

    if (compareList.services.length === 0) {
        return (
            <div className="container text-center mt-5">
                <h3 className="text-muted">Danh sách so sánh trống</h3>
                <p className="text-muted">Hãy thêm dịch vụ vào danh sách so sánh để xem chi tiết.</p>
            </div>
        );
    }

    return (
        <div className="container mt-4 mb-5">
            <h2 className="mb-4">So sánh dịch vụ ({compareList.services.length}/3)</h2>
            
            <div className="row">
                {compareList.services.map((service) => (
                    <div key={service.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm position-relative">
                            <div className="card-body d-flex flex-column">
                                <button 
                                    onClick={() => handleRemove(service.id)}
                                    className="btn-close position-absolute top-0 end-0 m-3"
                                    aria-label="Close"
                                ></button>

                                <h5 className="card-title pr-4 fw-bold">{service.name}</h5>
                                <hr />
                                
                                <div className="flex-grow-1">
                                    <p className="card-text mb-2">
                                        <strong>Chi tiết:</strong> <br/>
                                        <span dangerouslySetInnerHTML={{ __html: service.description }}></span>
                                    </p>
                                    <p className="card-text">
                                        <strong>Giá:</strong> <span className="text-danger fw-bold">{service.price}</span>
                                    </p>
                                </div>

                                <Link 
                                    to={`/${service.typeService}/${service.id}`}
                                    className="btn btn-primary mt-3 w-100 rounded-pill"
                                >
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompareService;