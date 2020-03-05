var getDetailsWithIfsc = function(params){
    const query = {
      name: 'bank-details-with-ifsc',
      text: 'SELECT * from bank_details where ifsc = $1',
      values: [params.ifsc],
    }
  
    return new Promise(function(resolve, reject) {
      client
      .query(query)
      .then(res => resolve(res.rows[0]))
      .catch(error => reject(error))
    });

};

var getDetailsWithNameAndCity = function(params){
  
  let offset = params.offset ? params.offset : 0;
  let limit = params.limit ? params.limit : 20;

  const query = {
    name: 'bank-details-with-name-and-city',
    text: 'SELECT * from bank_details where bank_name = $1 and city = $2 limit $3 offset $4',
    values: [params.bankName, params.city, limit+1, offset],
  }
  
  return new Promise(function(resolve, reject) {
    client
    .query(query)
    .then(res => {
        // Check the data count > limit - hasNext: true
        const hasNext = (res.rowCount > limit-1) ? true : false;
        // data count > 0 && offset > 0 - hasPrev: true
        const hasPrev = ((res.rowCount > 0) && (offset > 0)) ? true : false;
        // Remove the last record to give data for the asked limit
        const data = res.rowCount > 0 ? res.rows.slice(0, limit-1) : res.rows;
        
        resolve({
          hasNext,
          hasPrev,
          data
        })
    })
    .catch(error => reject(error))
  });
};

module.exports = {
  getDetailsWithIfsc : getDetailsWithIfsc,

  getDetailsWithNameAndCity : getDetailsWithNameAndCity
};