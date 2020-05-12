import request from '../utils/request';

export const fetchStaff = query => {
    return request({
        url: './staff.json',
        method: 'get',
        params: query
    });
};
