var getDetailsWithIfsc = function(params){
    const query = {
      name: 'bank-details-with-ifsc',
      text: 'SELECT * from bank_details where ifsc = $1',
      values: [params.ifsc],
    }
    
    return new Promise(function(resolve, reject) {
      dbClient
      .query(query)
      .then(res => resolve(res.rows[0]))
      .catch(error => reject(error))
    });
};

var getDetailsWithNameAndCity = function(params){
  
  let offset = params.offset ? parseInt(params.offset) : 0;
  let limit = params.limit ? parseInt(params.limit) : 20;

  const query = {
    name: 'bank-details-with-name-and-city',
    text: 'SELECT * from bank_details where bank_name = $1 and city = $2 limit $3 offset $4',
    values: [params.bankName, params.city, limit+1, offset],
  }
  
  return new Promise(function(resolve, reject) {
    dbClient
    .query(query)
    .then(res => {
        const numberOfRecordsFetched = res.rowCount;
        const conditionForPreviousOffset = ((numberOfRecordsFetched > 0) && (offset > 0));
        const conditionForNextOffset = (numberOfRecordsFetched > limit);

        const hasPrev = conditionForPreviousOffset ? true : false;
        const hasNext = conditionForNextOffset ? true : false;
        const prevOffset = conditionForPreviousOffset ? (offset - 1) : 'None';
        const nextOffset = conditionForNextOffset ? (offset + limit) : 'None';

        const data = numberOfRecordsFetched > 0 ? res.rows.slice(0, limit) : [];

        resolve({
          hasPrev,
          hasNext,
          prevOffset,
          nextOffset,
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