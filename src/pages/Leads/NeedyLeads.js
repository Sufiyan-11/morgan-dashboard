import React, { useState, useEffect, useContext } from "react";
import firebase from "../../config/Fire";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loader from "../../common/Loader/Loader";
import $ from "jquery";

function NeedyLeads() {
  const [showModal, setShowModal] = useState(false);

  const [postData, setPostData] = useState(null);
  const [isPostDelete, setIsPostDelete] = useState(false);
  const [postIsActive, setPostIsActive] = useState("");

  const [postId, setPostId] = useState("");

  const [loading, setLoading] = useState(true);

  const [postIsActiveStatus, setPostIsActiveStatus] = useState("");
  const [isPostEdited, setIsPostEdited] = useState(false);
  const [editDetails, setEditDetails] = useState(false);

  useEffect(() => {
    setIsPostDelete(false);
    setIsPostEdited(false);

    getPostData();
    // getRegisteredUserDetail();
  }, [isPostDelete, isPostEdited]);

  const getPostData = () => {
    firebase
      .database()
      .ref(`needy`)
      .get()
      .then((response) => {
        setTimeout(() => setPostData(response.val()), 5000);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  // const handleAddPostData = () => {
  //   if (editDetails) {
  //     firebase
  //       .database()
  //       .ref(`needy/${postId}`)
  //       .set({
  //         postIsActiveStatus:
  //           postIsActiveStatus === "" ? postIsActive : postIsActiveStatus,
  //         postTimestamp: new Date().toUTCString(),
  //       })
  //       .then((response) => {
  //         alert("Table edited successfully");
  //         window.location.reload();
  //         setIsPostEdited(true);
  //       })
  //       .catch((error) => console.log("Error in handleAddPostData: " + error));
  //   }

  //   setShowModal(false);
  //   setPostIsActiveStatus("");
  //   // setPostTimestamp("");
  // };

  const handleAddPostData = () => {
    if (editDetails) {
      // Fetch existing data for the post
      firebase
        .database()
        .ref(`needy/${postId}`)
        .get()
        .then((snapshot) => {
          const existingData = snapshot.val();

          // Update only the required fields
          const updatedData = {
            ...existingData,
            postIsActiveStatus:
              postIsActiveStatus === "" ? postIsActive : postIsActiveStatus,
            postTimestamp: new Date().toUTCString(),
          };

          // Set the merged data back to the database
          firebase
            .database()
            .ref(`needy/${postId}`)
            .set(updatedData)
            .then((response) => {
              alert("Table edited successfully");
              window.location.reload();
              setIsPostEdited(true);
            })
            .catch((error) =>
              console.log("Error in handleAddPostData: " + error)
            );
        })
        .catch((error) => console.log("Error fetching data: " + error));
    }

    setShowModal(false);
    setPostIsActiveStatus("");
  };

  const handleEdit = (postIsActive, postId) => {
    setShowModal(true);
    setEditDetails(true);
    setPostIsActive(postIsActive);
    setPostId(postId);
    console.log(showModal);
    // console.log(editDetails)
    // console.log(postIsActive)
    // console.log(postId)
  };

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete the Post?")) {
      firebase
        .database()
        .ref(`needy/${postId}`)
        .remove()
        .then((response) => {
          alert("Needy lead deleted successfully");
          window.location.reload();
          setIsPostDelete(true);
        })
        .catch((error) => console.log("Error in handleDelete: " + error));
    }
  };

  $(document).ready(function () {
    $("#search-input").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#enrollment-list-table tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });

  const modalCloseHandler = () => {
    setShowModal(false);
    setEditDetails(false);
  };

  let modalContent = showModal ? (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {editDetails ? "Edit event" : "Add event"}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={modalCloseHandler}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    className="form-control"
                    value={editDetails ? postIsActive : ""}
                    onChange={(event) => setPostIsActive(event.target.value)}
                  >
                    <option value="" disabled>
                      Select Session Status
                    </option>
                    <option value="0">In-Active</option>
                    <option value="1">Active</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={handleAddPostData}
              className="btn btn-sm btn-primary"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <Navbar />
      <div className="wrapper d-flex align-items-stretch">
        <Sidebar />

        <div className="container-fluid main bg-light py-5">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              <div className="add-teacher-profile pb-3">
                <div className="title">
                  <h2 id="teach_profile">Enquire Needy Leads</h2>
                </div>
              </div>
              <div className="m-content">{modalContent}</div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="inputEmail4">Search based on Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="search data"
                    id="search-input"
                  />
                </div>
              </div>

              <div className="view-post">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <table className="table table-striped table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Contact</th>
                          <th scope="col">No Of Family members</th>
                          <th scope="col">Earning members in Family</th>
                          <th scope="col">Yearly Income</th>
                          <th scope="col">Source Of Income</th>
                          <th scope="col">Ration Card</th>
                          <th scope="col">Needs</th>
                          <th scope="col">Action</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody id="c">
                        {postData ? (
                          Object.entries(postData)
                            .sort((a, b) =>
                              a[1].postTimestamp < b[1].postTimestamp ? 1 : -1
                            )
                            .map((item) => (
                              <>
                                <tr key={item[0]} className="job-open">
                                  <td>{item[1].username}</td>
                                  <td>{item[1].email}</td>
                                  <td>{item[1].number}</td>
                                  <td>{item[1].family}</td>
                                  <td>{item[1].earning}</td>
                                  <td>{item[1].income}</td>
                                  <td>{item[1].source}</td>
                                  <td>{item[1].ration}</td>
                                  <td>{item[1].message}</td>
                                  <td>
                                    <div className="d-flex justify-content-between">
                                      <a onClick={() => handleDelete(item[0])}>
                                        <i className="fas fa-trash-alt text-danger pe-3"></i>
                                      </a>
                                      <a
                                        onClick={() =>
                                          handleEdit(
                                            item[1].postIsActiveStatus,
                                            item[0]
                                          )
                                        }
                                        className=""
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                      >
                                        <i className="fas fa-pencil-alt"></i>
                                      </a>
                                    </div>
                                  </td>
                                  <td>
                                    {item[1].postIsActiveStatus === "1"
                                      ? "Active"
                                      : "Inactive"}
                                  </td>
                                </tr>
                              </>
                            ))
                        ) : (
                          <span>
                            We'll notify you as soon as something becomes
                            available.
                          </span>
                        )}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NeedyLeads;
