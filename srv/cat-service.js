// const cds = require('@sap/cds');
// const { data } = require('@sap/cds/lib/dbs/cds-deploy');

// module.exports = cds.service.impl((srv)=>{

//     srv.before('CREATE', 'Books', async (req) =>{
//         // console.log('Entered Validation');
//         // if(req.data.book_name=="Kings"){
//         //     req.reject(500,'Books with name Kings cannot be created');
//         // }

//         let currentBookName = req.data.book_name;

//         let datapresent = await SELECT.from('amazon_Books').where({book_name:currentBookName});

//         if(datapresent.length>0){
//             req.reject(500,'Book is already present in DB');
//         }
//     });

//     srv.after('CREATE', 'Books', async(data,req) =>{
//         console.log("Entered After");
//         let payloadForLogs = {
//             "log_message" : `Book with name ${data.book_name} is inserted successfully`
//         }

//     let bookLogs = await INSERT.into('amazon_Logs').entries(payloadForLogs)
//     console.log(bookLogs)
//     req.info(`Book ${data.book_name} was inserted successfully.`);
//     });

//     srv.on('CREATE', 'BooksAndAuthors',async (req)=>{
//         console.log("Entered");
//         let data = req.data.book_id;
//         let datafromBTP = await SELECT.from('amazon_Books').where({book_id:data});

//         let res ={
//             book_id : datafromBTP[0].BOOK_ID,
//             book_name: dataFROMBTP[0].BOOK_NAME,
//             AuthorName: "Sudip"
//         }
//         req.reply(res);

//     })
// });



const cds = require('@sap/cds');

module.exports = cds.service.impl((srv) => {

  srv.before('CREATE', 'Books', async (req) => {
    const currentBookName = req.data.book_name;
    const datapresent = await SELECT.from('amazon_Books').where({ book_name: currentBookName });

    if (datapresent.length > 0) {
      req.reject(500, 'Book is already present in DB');
    }
  });

  srv.after('CREATE', 'Books', async (data, req) => {
    const payloadForLogs = {
      log_message: `Book with name ${data.book_name} is inserted successfully`
    };

    const bookLogs = await INSERT.into('amazon_Logs').entries(payloadForLogs);
    console.log(bookLogs);
    req.info(`Book ${data.book_name} was inserted successfully.`);
  });

  srv.on('CREATE', 'BookandAuthors', async (req) => {
    const bookId = req.data.book_id;

    const datafromBTP = await SELECT.from('amazon_Books').where({ book_id: bookId });

    if (!datafromBTP.length) {
      return req.reject(404, 'Book not found with given ID');
    }

    const res = {
      book_id: datafromBTP[0].BOOK_ID,
      book_name: datafromBTP[0].BOOK_NAME,
      AuthorName: 'Sudip'
    };

    return res;
  });

});
