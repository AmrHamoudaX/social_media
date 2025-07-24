import axios from "axios";

const baseUrl = "/api/posts";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

async function getAll() {
  const request = await axios.get(baseUrl);
  return request.data;
}

async function create(newObject) {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, newObject, config);
  return request.data;
}

async function update(id, newObject) {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.data;
}

async function deleteId(id) {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
}

export default { getAll, create, update, deleteId, setToken };
