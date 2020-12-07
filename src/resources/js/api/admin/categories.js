import axiosInstance from '@/plugins/axios';

const module = 'api/admin/categories';

async function index() {
  try {
    return await axiosInstance.get(`${module}`);
  } catch (err) {
    console.log(err);
  }
}

async function show(id) {
  try {
    return await axiosInstance.get(`${module}/${id}`);
  } catch (err) {
    console.log(err);
  }
}

async function store(form) {
  try {
    const res = await axiosInstance.post(`${module}`, form);

    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
}

async function update(form) {
  try {
    const res = await axiosInstance.put(`${module}/${form.id}`, form);

    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
}

async function destroy(id) {
  try {
    const res = await axiosInstance.delete(`${module}/${id}`);

    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
}

export { index, show, store, update, destroy };
