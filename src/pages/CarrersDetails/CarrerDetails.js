import React, { useState, useEffect, useContext} from 'react';
import firebase from '../../config/Fire';
import { storage } from "../../config/Fire";
import Axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from '../../context/Auth';
import Loader from "../../common/Loader/Loader";
import $ from 'jquery';

function CarrerDetails(props) {

  const [showModal, setShowModal] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const [postData, setPostData] = useState("");
  const [isPostDelete, setIsPostDelete] = useState(false);

  const [postId, setPostId] = useState("");

  const [loading, setLoading] = useState(true);

  const [registerUser, setRegisterUser] = useState("");


  useEffect(() => {
    setIsPostDelete(false);
    getPostData();
    // getRegisteredUserDetail();
  }, [isPostDelete]);


  const getPostData = () => {
    // Axios
    // .get(`https://educaretech-dashboard-default-rtdb.firebaseio.com/contactLead.json`)
    firebase.database().ref(`careerDetailsData`).get()
    .then((response) => {
      // setPostData(response.data)
      setTimeout(setPostData(response.val()), 5000);
      setLoading(false);
    })
    .catch((error) => console.log(error));
};

    // handles archive on card archive click
    const handleDelete = (postId, e) => {
      if (window.confirm("Are you sure you want to delete the Post?")) {
      // Axios
      // .delete(`https://educaretech-dashboard-default-rtdb.firebaseio.com/contactLead/${postId}.json`)
        firebase.database().ref(`careerDetailsData/${postId}`).remove()
        .then((response) => {
          alert("Carrer Details deleted succesfully");
          window.location.reload();
          setIsPostDelete(true);
        })
        .catch((error) => console.log("Error" + error));
      }
    };

    $(document).ready(function(){
      $("#search-input").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#enrollment-list-table tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });


  return(
    <>
     <Navbar />
    <div className="wrapper d-flex align-items-stretch">
    <Sidebar />
  
    <div className="container-fluid main bg-light py-5">
        <div className="row justify-content-center">
            <div className="col-lg-11">
            <div className="add-teacher-profile pb-3">
                    <div className="title">
                        <h2 id="teach_profile">CarrerDetails</h2>
                    </div>
                </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="inputEmail4">Search based on Name</label>
                  <input type="text" className="form-control" placeholder="search data" id="search-input"/>
                </div>
              </div>

              <div className="view-post">
                    {/* <div className="post-datas">
                        <div class="card-deck"> */}
        {loading ? (
            <Loader></Loader>
          ) : (
      <>
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Email Address</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Applied For</th>
                  <th scope="col">File</th>
                  <th scope="col">Message</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="c">
              {postData ?
                Object.entries(postData).sort((a, b) => a[1].postTimestamp < b[1].postTimestamp ? 1:-1).map((item) => (
                      // var x = {item[1].status}
                      <>
                      <tr key={item[0]} className="job-open ">
                      <td>{item[1].username}</td>
                      <td>{item[1].email}</td>
                        <td>{item[1].number}</td>
                        <td>{item[1].appliedfor}</td>
                        <td>{item[1].file}</td>
                        <td>{item[1].message}</td>
                        <td>                       
                          <a onClick={(e) => handleDelete(item[0], e)}><i className="fas fa-trash-alt text-danger pl-2"></i></a>
                        </td>
                      </tr>
                    </>
                      
                    )) :
                        <span>We'll notify you as soon as something becomes available.</span>
                    }
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

export default CarrerDetails;
