// newsletter schema
var newsletterSChema = new mongoose.Schema({
    //Name: String, 
    Email: String, 
    //Message: String, 
    RequestDate: String
});

var newsletterModel = mongoose.model("newsletter", newsletterSChema, "newsletter")

// list newsletter
app.post('/api/newsletter/view', function(req, res) {
    newsletterModel.find(function(err, emailInfo) {
        if (err)
            res.send(err)
        res.json(emailInfo);
        console.log('Newletter returned')
    });
});
// Create newsletter
app.post('/api/newsletter/add', function(req, res) {
	newsletterModel.create({
		//Name : 'Mj',
		Email : 'mj@gmail.com',
        //Message : 'Cool',
        RequestDate: new Date()
        }, 
        function(err, emailInfo) {
            if (err){
                res.send(err);
            }else{
                res.json(emailInfo)
                console.log('Newsletter created')
            }   
        }
    );
});