const HEADER = {
    headers: {
   'Authorization': `Bearer ${localStorage.getItem('token')}`
 }
}

export default  HEADER