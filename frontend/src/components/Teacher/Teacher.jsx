import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import "./Teacher.css";
import axios from "axios";
import { domen } from "../..";
const Teacher = () => {
  const [show, setShow] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
  });
  function draw() {
    axios.get(domen + "/teachers").then((res) => {
      setTeachers(res.data);
    });
  }

  useEffect(() => {
    draw();
  }, []);

  const addTeacher = (e) => {
    e.preventDefault();
    // axios.post("/teacher", data).then((res) => {
    //   draw();
    //   setData({ firstname: "", lastname: "" });
    // });
  };

  const handleClose = () => {
    setData({ firstname: "", lastname: "" });
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <div className="teacher">
      <div className="teacher_header">
        <Button variant="primary" onClick={handleShow}>
          Qo'shish
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>O'qituvchi Ma'lumotlari</Modal.Title>
          </Modal.Header>
          <form onSubmit={addTeacher}>
            <Modal.Body className="d-flex flex-column gap-2">
              <label>
                <span>Ismi</span>
                <input
                  type="text"
                  className="form-control m-2"
                  required
                  placeholder="ism"
                />
              </label>
              <label>
                <span>Familyasi</span>
                <input
                  type="text"
                  className="form-control m-2"
                  required
                  placeholder="familya"
                />
              </label>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" onClick={addTeacher}>
                Qo'shish
              </Button>
              <Button variant="danger" onClick={handleClose}>
                X
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      <div className="teacher_body">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Ismi</th>
              <th>Familiyasi</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teacher;
