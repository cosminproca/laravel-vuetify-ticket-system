import axiosInstance from '@/plugins/axios';

async function register(form) {
  try {
    const { data } = await axiosInstance.post('api/auth/register', form);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
}

async function login(form) {
  try {
    const { data } = await axiosInstance.post('api/auth/login', form);

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
}

async function logout() {
  try {
    const { data } = await axiosInstance.post('api/auth/logout');

    return data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
}

async function user() {
  try {
    const { data } = await axiosInstance.get('api/auth/user');

    return data;
  } catch (e) {
    return e.response.data;
  }
}

export { register, login, logout, user };
