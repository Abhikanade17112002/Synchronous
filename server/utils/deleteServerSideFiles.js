const fs = require("fs") ;
const deleteServerSideFiles = (filePath) =>{
    try {
        fs.unlink(filePath,
            (err => {
                if (err) console.log("SOMETHING WENT WRONG WHILE CLEARING SERVER FILE",err);
                else {
                    console.log(`\nDeleted file: ${filePath}`);
                  
                }
            }));
    } catch (error) {
        console.log("SOMETHING WENT WRONG WHILE CLEARING SERVER FILE",error);
        
    }
}


module.exports = deleteServerSideFiles ;
