import instance from "../configs/config";

export const getAllTodo = ( id,navigate) => {
    try {
      const res = instance.get(`/todo/${id}`, {
   
      });
      return res
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  export const createTodo = (formData, navigate) => {
    try {
      const res = instance.post("/todo",formData, {
      });
      return res
    } catch (error) {
      console.log(error);
      navigate('/');
    }
  };
  export const updateTodo = (id,formData, navigate) => {
    try {
      const res = instance.put(`/todo/${id}`,formData, {
      });
      return res
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  export const deleteCategory = (id, navigate) => {
    try {
      const res = instance.delete(`/todo/${id}`, {
      });
      return res
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  