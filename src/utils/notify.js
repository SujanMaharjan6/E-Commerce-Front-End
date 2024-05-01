import { toast } from 'react-toastify'



const infoo = (msg) => {
    toast.info(msg);
}
const successs = (msg) => {
    toast.success(msg);
}
const errorr = (msg) => {
    toast.error(msg);
}
const warns = (msg) => {
    toast.warning(msg);
}


const handleError = (error) => {
debugger;
let errMsg = 'something went wrong';
let err = error && error.response;
console.log('response', error.response);
console.log('response123', error);
console.log('responseerr', err);
console.log('responseerr.data', err.data.msg);
if(err && err.data)
{
    errMsg = err.data.msg;
}
return errorr(errMsg);
}

const t = {
    infoo,
    successs,
    errorr,
    warns,
    handleError
}
export default t;