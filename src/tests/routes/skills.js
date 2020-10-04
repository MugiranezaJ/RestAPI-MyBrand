
import chai from 'chai'
import chaiHttp from 'chai-http'
import {skillsModel} from '../../models/models.js'
import { token } from '../../config/previlage.js';
import { app } from '../../server.js';
chai.use(chaiHttp)

describe('Skills', function(){
    this.timeout(5000); 
    it('it should GET all the Skills', (done) => {
        chai.request(app)
            .get('/api/Skills/view')
            .end((err, res) => {
                if(err) done(err)
                chai.expect(res).have.status(200);
                chai.expect(res.body).length(res.body.length).greaterThan(0);
                done();
            })
    });
    it("should return 403 if no Authorization", (done)=>{
        chai.request(app)
        .post("/api/skills/add")
        .send(
            {"title":"json"},
            {"skill_image":"skills.png"},
        )
        .then((res) =>{
            chai.expect(res).to.have.status(403)
            done()
        })
        .catch((err) =>{
            done(err)
        })
            
    })
})
