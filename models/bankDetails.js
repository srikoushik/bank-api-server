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

module.exports = {
  getDetailsWithIfsc : getDetailsWithIfsc,
};