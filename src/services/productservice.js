import axios from 'axios';
import qs from 'qs';
const baseURL = 'http://localhost:1337/api';

export const getProductList = () => {
    const query = qs.stringify(
        {
            populate: '*',
            fields: '*',
            publicationState: 'live',
            locale: ['en', 'de']
        },
        {
            encodeValuesOnly: true
        }
    );

    let url = `${baseURL}/products?filters[isActive][$eq]=${'true'}&${query}`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const loginUser = (email, password) => {
    let url = `${baseURL}/platformusers?filters[email][$eq]=${email}&filters[password][$eq]=${password}`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const addMeals = (meal) => {
    let url = `${baseURL}/products`;

    return axios.post(url, { data: meal }).then((response) => {
        return response.data;
    });
};

export const upload = (file) => {
    let url = `${baseURL}/upload`;

    return axios.post(url, file).then((response) => {
        return response.data;
    });
};

export const addOrder = (order) => {
    let url = `${baseURL}/orders`;

    return axios.post(url, { data: order }).then((response) => {
        return response.data;
    });
};

export const getCategory = () => {
    let url = `${baseURL}/categories`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const getProductListByCategory = (category) => {
    const query = qs.stringify(
        {
            populate: '*',
            fields: '*',
            publicationState: 'live',
            locale: ['en', 'de']
        },
        {
            encodeValuesOnly: true
        }
    );
    let url = `${baseURL}/products?filters[category][$eq]=${category}&${query}`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const getOrder = () => {
    let url = `${baseURL}/orders`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const addUserAddress = (userData) => {
    let url = `${baseURL}/addresses`;

    return axios.post(url, { data: userData }).then((response) => {
        return response.data;
    });
};

export const getUserAddress = () => {
    const userid = localStorage.getItem('userid');

    let url = `${baseURL}/addresses?filters[userid][$eq]=${userid}`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const deleteUserAddress = (id) => {
    let url = `${baseURL}/addresses/${id}`;

    return axios.delete(url).then((response) => {
        return response.data;
    });
};

export const addOrderDetails = (cartdetails) => {
    let url = `${baseURL}/orderdetails`;

    return axios.post(url, { data: cartdetails }).then((response) => {
        return response.data;
    });
};

export const getOrderDetails = (id) => {
    let url = `${baseURL}/orderdetails?filters[orderId][$eq]=${id}`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const getUsers = () => {
    let url = `${baseURL}/platformusers`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const getMealDetails = (id) => {
    const query = qs.stringify(
        {
            populate: '*',
            fields: '*',
            publicationState: 'live',
            locale: ['en', 'de']
        },
        {
            encodeValuesOnly: true
        }
    );

    let url = `${baseURL}/products/${id}?${query}`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const updateMeals = (id, meal) => {
    let url = `${baseURL}/products/${id}`;

    return axios.put(url, { data: meal }).then((response) => {
        return response.data;
    });
};

export const getOrdersReport = (startTime, endTime) => {
    let url = `${baseURL}/orders?filters[timestamp][$between]=${startTime}&filters[timestamp][$between]=${endTime}`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const getOrdersDetailsReport = (startTime, endTime, category) => {
    let url = `${baseURL}/orderdetails?filters[timestamp][$between]=${startTime}&filters[timestamp][$between]=${endTime}&filters[category][$eq]=${category}`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const getRegisterUsers = () => {
    const usertype = 'User';
    let url = `${baseURL}/platformusers?filters[usertype][$eq]=${usertype}`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const getCouponCode = () => {
    let url = `${baseURL}/couponcodes`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const addCouponCode = (coupon) => {
    let url = `${baseURL}/couponcodes`;

    return axios.post(url, { data: coupon }).then((response) => {
        return response.data;
    });
};

export const getCouponCodeDetails = (id) => {
    let url = `${baseURL}/couponcodes?filters[id][$eq]=${id}`;

    return axios.get(url).then((response) => {
        return response.data;
    });
};

export const updateCouponCode = (id, coupon) => {
    let url = `${baseURL}/couponcodes/${id}`;

    return axios.put(url, { data: coupon }).then((response) => {
        return response.data;
    });
};
