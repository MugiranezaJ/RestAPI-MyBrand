import assert from 'assert'
import chai from 'chai'
import chaiHttp from 'chai-http'
import {app} from '../../server.js'
import {newsletterModel} from '../../models/models.js'
import { token } from '../../config/previlage.js';
import { Newsletter } from '../../routes/newsletter.js';
chai.use(chaiHttp)

before(function(done){
    chai.request(app)
    .post('/api/newsletter/add')
    .set("Authorization", token)
    .send({"email":"jackswalter@test.rw"})
    .end((err, res) => {
        if(err) done(err)                    
        // chai.expect(res).have.status(200);
        // chai.expect(res.body).be.a('object');
    done();
    });
})
describe('Newsletter', function(){
    this.timeout(5000); 
    it('it should GET all the Newsletter', (done) => {
        chai.request(app)
            .get('/api/newsletter/view')
            .end((err, res) => {
                if(err) done(err)
                chai.expect(res).have.status(200);
                chai.expect(res.body).length(res.body.length).greaterThan(0);
                done();
            })
    });
    it('should delete a newsletter', (done) =>{
        newsletterModel.findOne({Email: "jackswalter@test.rw"}).then(function(result){
            chai.request(app)
            .post('/api/newsletter/delete')
            .set('Content-Type', 'application/json')
            .set("Authorization", token)
            .send({"id":result._id})
            .then((res) => {
                chai.expect(res).have.status(200);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("_id")
                done();
            })   
            .catch((err) =>{
                console.log(err)
                done(err)
            })                 
        })
    })
    // it('should view a newsletter', (done) =>{
    //     chai.request(app)
    //         .get('/api/newsletter/view')
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
        this.timeout(20000);
        chai.request(app)
        .post('/api/newsletter/add')
        .set("Authorization", token)
        .send({"email":"mjacks@test.com"})
        .end((err, res) => {
            if(err) done(err)                    
            chai.expect(res).have.status(200);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).to.have.deep.property("_id")
            done();
        });
    })
    it("should be ok", (done) =>{
        chai.request(app)
        .get('/api/newsletter/view')
        .end((err, res) =>{
            if(err) done(err)
            done()
        })
    })
})

after(function(done){
    this.timeout(20000);
    newsletterModel.findOne({Email: "mjacks@test.com"}).then(function(result){
        chai.request(app)
        .post('/api/newsletter/delete')
        .set('Content-Type', 'application/json')
        .set("Authorization", token)
        .send({"id":result._id})
        .then((res) => {
            chai.expect(res.body).to.have.deep.property("_id")
            done();
        })   
        .catch((err) =>{
            done(err)
        })                 
    })
})
