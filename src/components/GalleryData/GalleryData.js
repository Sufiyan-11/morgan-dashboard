import React, { useContext } from 'react';
import { AuthContext } from '../../context/Auth';
import Moment from 'react-moment';
import parse from 'html-react-parser';


const GalleryData = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { id,
    gallImage,
    postTopicName,
    // postLongDetail,
    postTimestamp,
    onClickhandleEdit,
    onClickhandleDelete,
    gallIsActiveStatus
  } = props;

  return (
    <div className="col-lg-4 session-card ">
      <div className="card activity-card1 shadow mb-3" style={{ width: "100%" }}>
        <img className="card-img-top" src={gallImage} alt="Card image cap" />
        <div className="card-body">
          <a className="view-data" data-toggle="modal" data-target={"#" + id}>
            <h4 className="card-title blog-post-title">{postTopicName}</h4>
            
          </a>
          <div className="view-session d-flex justify-content-between pb-2">
            <div className="user-profile-data">
            {gallIsActiveStatus == 1 ?  <span className='card-text text-success'>Active</span> : <span className='card-text text-danger'>In Active</span>}<br />
              <small className="card-text profile-text"><b>Posted By :</b> {currentUser.displayName}</small><br />
              <small className="card-text profile-text"><b>Posted On :</b> <Moment format="DD MMM YYYY">{postTimestamp}</Moment></small>
            </div>
            <div className="like-comment">
              <a className="edit-btn" title="Edit Post" data-toggle="modal" data-target="#exampleModal" onClick={onClickhandleEdit}><i className="fas fa-pencil-alt"></i></a>
              
            </div>
           
          </div>
          <div>
            <button type="button" className="close btn trash-post" onClick={onClickhandleDelete}>
                    <span><i className="fas fa-trash"></i></span>
                  </button>
            </div>
        </div>
        {/* view post modal*/}
        <div className="modal modal-right fade" id={id} tabindex="-1" role="dialog" aria-labelledby={id}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title card-title activity-title text-primary" id="exampleModalLabel">Gallery Data</h5>
                <div className="d-flex">
                  <button type="button" className="close btn trash-post" onClick={onClickhandleDelete}>
                    <span><i className="fas fa-trash"></i></span>
                  </button>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i className="far fa-times-circle"></i></span>
                  </button>
                </div>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12 text-rigth">
                      <h4 className="card-title activity-title">Gallery Image</h4>
                      <img className="card-img" src={gallImage} alt="Card image cap" />
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-sm btn-primary" data-dismiss="modal" aria-label="Close">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* view post */}
      </div>
    </div>

  );
};

export default GalleryData;