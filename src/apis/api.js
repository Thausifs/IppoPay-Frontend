import axios from "axios";


// const instance = axios.create({
//   baseURL: process.env.REACT_APP_SERVER,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
export const Users = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}/api`,
});


export const CreateUser = async (data) => {
  const CreateUser = await Users.post(`/users/register`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      // alert(err.message);
      return err.response;
    });

  return CreateUser;
};



