
import chai from 'chai'
import chaiHttp from 'chai-http'
import {contactsModel} from '../../models/models.js'
import { token } from '../../config/previlage.js';
chai.use(chaiHttp)
export function testContacts(app) {
    var contact = {
        "name":"js",
        "email":"js@gmail.com",
        "message":"mn vip"
    }
    before(function(done){
        this.timeout(20000);
        chai.request(app)
        .post('/api/contacts/add')
        .set("Authorization", token)
        .send(contact)
        .end((err, res) => {
            if(err) done(err)                    
            // chai.expect(res).have.status(200);
            // chai.expect(res.body).be.a('object');
        done();
        });
    })
    describe('Contact', function(){
        this.timeout(5000); 
        it('it should GET all the Contacts', (done) => {
            //.timeout(30 * 1000)
            chai.request(app)
                .get('/api/contacts/view')
                //.set({"Authorization": token})
                .end((err, res) => {
                    if(err) done(err)
                    chai.expect(res).have.status(200);
                    chai.expect(res.body).length(res.body.length).greaterThan(0);
                    done();
                })
        });
        it('should delete a Contact', (done) =>{
            contactsModel.findOne({Name: "js"}).then(function(result){
                chai.request(app)
                .post('/api/contacts/delete')
                .set('Content-Type', 'application/json')
                .set("Authorization", token)
                .send({"id":result._id})
                .then((res) => {
                    //console.log(res.body);
                    chai.expect(res).have.status(200);
                    chai.expect(res.body).be.a('object');
                    chai.expect(res.body).to.have.deep.property("_id")
                    done();
                })   
                .catch((err) =>{
                    console.log(err)
                    done(err)
                })                 
                //assert.strictEqual(result , null, "Still exists")
            })
        })
        // it('should view a Contact', (done) =>{
        //     chai.request(app)
        //         .get('/api/contacts/view')
        //         .send({"id":"5f72d4aefbd82e0268c1fb89"})
        //         //.send({"email":"jackswalter@test.com"})
        //         .end((err, res) => {
        //             if(err) done(err)
        //             //console.log(res.body);
                    
        //             chai.expect(res).have.status(200);
        //             chai.expect(res.body).to.be.an("object")
        //             chai.expect(res.body).to.have.deep.property("_id")
        //             done();
        //         })
        // })
        it('should insert a newsletters', (done) =>{
            var icontacts = {
                "name":"jx",
                "email":"jx@gmail.com",
                "message":"hi there"
            }
            this.timeout(20000);
            chai.request(app)
            .post('/api/contacts/add')
            .set("Authorization", token)
            .send(icontacts)
            //.set('Content-Type', 'multipart/form-data')
            //.field("title","1article to delete" )
            //.attach("article_image", "download.jpg")
            //.field("description", "this is the article to delete from the test")
            .end((err, res) => {
                if(err) done(err)                    
                chai.expect(res).have.status(200);
                chai.expect(res.body).be.a('object');
                done();
            });
        })
    })
    it("should return 403", (done)=>{
        chai.request(app)
        .post("/api/contacts/add")
        .send(
            {"name":"json"},
            {"email":"json@man.rw"},
            {"message":"hello there"}
        )
        .then((res) =>{
            chai.expect(res).to.have.status(403)
            done()
        })
        .catch((err) =>{
            done(err)
        })
            
    })

    after(function(done){
        this.timeout(20000);
        contactsModel.findOne({Name: "jx"}).then(function(result){
            chai.request(app)
            .post('/api/contacts/delete')
            .set('Content-Type', 'application/json')
            .set("Authorization", token)
            .send({"id":result._id})
            .then((res) => {
                //console.log(res.body);
                chai.expect(res).have.status(200);
                // chai.expect(res.body).be.a('object');
                // chai.expect(res.body).to.have.deep.property("_id")
                done();
            })   
            .catch((err) =>{
                done(err)
            })                 
        })
    })
}
