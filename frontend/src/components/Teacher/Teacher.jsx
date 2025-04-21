import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { domen } from "../..";
import { IoIosPersonAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import apiCall from "../../utils/ApiCall";
import "./Teacher.css";
const Teacher = () => {
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingItem, setEditingItem] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });
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

  function editTeacher(item) {
    handleShow();
    setEditingItem(item);
    setData({
      firstname: item.firstName,
      lastname: item.lastName,
    });
    setEditing(true);
  }
  const addTeacher = (e) => {
    e.preventDefault();
    if (editing) {
      apiCall("/teacher/" + editingItem.id, "POST", data).then((res) => {
        draw();
        setEditing(false);
        setEditingItem({
          id: "",
          firstName: "",
          lastName: "",
        });
      });
    } else {
      apiCall("/teacher", "POST", data).then((res) => {
        draw();
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setData({ firstname: "", lastname: "" });
    setShow(false);
  };

  function removeTeacher(id) {
    apiCall("/teacher/" + id, "DELETE").then((res) => {
      draw();
    });
  }
  const handleShow = () => setShow(true);
  return (
    <div className="teacher">
      <div className="teacher_header d-flex gap-2 justify-content-end">
        <Button
          variant="primary"
          className="d-flex align-items-center gap-2"
          onClick={handleShow}
        >
          Qo'shish
          <IoIosPersonAdd />
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
                  value={data.firstname}
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, firstname: e.target.value })
                  }
                  className="form-control m-2"
                  required
                  placeholder="ism"
                />
              </label>
              <label>
                <span>Familyasi</span>
                <input
                  value={data.lastname}
                  onChange={(e) =>
                    setData({ ...data, lastname: e.target.value })
                  }
                  type="text"
                  className="form-control m-2"
                  required
                  placeholder="familya"
                />
              </label>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                className="d-flex align-items-center gap-2"
                type="submit"
              >
                Qo'shish
                <FaRegSave />
              </Button>
              <Button
                variant="danger"
                className="d-flex gap-2 align-items-center"
                onClick={handleClose}
              >
                <IoCloseCircleOutline />
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td className="d-flex gap-1">
                  <button
                    className="btn btn-primary d-flex gap-2 align-items-center"
                    onClick={() => editTeacher(item)}
                  >
                    <CiEdit />
                  </button>
                  <button
                    className="btn btn-danger d-flex align-items-center gap-2"
                    onClick={() => removeTeacher(item.id)}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teacher;
